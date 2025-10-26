import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import {
  Notification,
  NotificationType,
  NotificationStatus,
  Prisma,
} from '@prisma/client';
import { CreateNotificationInput } from './dto/create-notification.input';
import { NotificationConnection } from './models/notification-connection.model';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  private pubSub: PubSub;

  constructor(private prisma: PrismaService) {
    this.pubSub = new PubSub();
  }

  async createNotification(
    userId: string,
    input: CreateNotificationInput,
  ): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        userId,
        drugScheduleId: input.drugScheduleId,
        type: input.type,
        title: input.title,
        message: input.message,
        scheduledFor: new Date(input.scheduledFor),
        status: NotificationStatus.PENDING,
      },
      include: {
        user: true,
        drugSchedule: {
          include: {
            drug: true,
          },
        },
      },
    });
  }

  async generateDrugReminders(): Promise<void> {
    this.logger.log('Generating drug reminders for next 24 hours...');

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(tomorrow.getHours() + 24);

    const upcomingSchedules = await this.prisma.drugSchedule.findMany({
      where: {
        taken: false,
        drug: {
          isActive: true,
          startDate: { lte: tomorrow },
          OR: [{ endDate: null }, { endDate: { gte: now } }],
        },
      },
      include: {
        drug: {
          include: {
            user: true,
          },
        },
        notifications: {
          where: {
            scheduledFor: {
              gte: now,
              lte: tomorrow,
            },
            status: NotificationStatus.PENDING,
          },
        },
      },
    });

    for (const schedule of upcomingSchedules) {
      if (schedule.notifications.length === 0) {
        const scheduledTime = this.parseTimeToDate(schedule.time);

        if (scheduledTime > now && scheduledTime <= tomorrow) {
          const reminderTime = new Date(scheduledTime);
          reminderTime.setHours(reminderTime.getHours() - 1);

          if (reminderTime > now) {
            await this.prisma.notification.create({
              data: {
                userId: schedule.drug.userId,
                drugScheduleId: schedule.id,
                type: NotificationType.DRUG_REMINDER,
                title: `Reminder: ${schedule.drug.name}`,
                message: `Don't forget to take ${schedule.dosage} of ${schedule.drug.name} at ${schedule.time}`,
                scheduledFor: reminderTime,
                status: NotificationStatus.PENDING,
              },
            });

            this.logger.log(
              `Created reminder for ${
                schedule.drug.name
              } at ${reminderTime.toISOString()}`,
            );
          }
        }
      }
    }

    this.logger.log('Drug reminders generation completed');
  }

  async processPendingNotifications(): Promise<void> {
    this.logger.log('Processing pending notifications...');

    const now = new Date();
    const pendingNotifications = await this.prisma.notification.findMany({
      where: {
        status: NotificationStatus.PENDING,
        scheduledFor: { lte: now },
      },
      include: {
        user: true,
        drugSchedule: {
          include: {
            drug: true,
          },
        },
      },
    });

    for (const notification of pendingNotifications) {
      try {
        await this.sendNotification(notification);

        await this.prisma.notification.update({
          where: { id: notification.id },
          data: {
            status: NotificationStatus.SENT,
            sentAt: new Date(),
          },
        });

        this.logger.log(`Notification ${notification.id} sent successfully`);
      } catch (error) {
        this.logger.error(
          `Failed to send notification ${notification.id}:`,
          error,
        );

        await this.prisma.notification.update({
          where: { id: notification.id },
          data: { status: NotificationStatus.FAILED },
        });
      }
    }

    this.logger.log('Pending notifications processed');
  }

  async findUserNotifications(
    userId: string,
    { after, before, first, last }: PaginationArgs,
    unreadOnly?: boolean,
  ): Promise<NotificationConnection> {
    const where: Prisma.NotificationWhereInput = {
      userId,
      ...(unreadOnly && { read: false }),
    };

    return findManyCursorConnection(
      (args) =>
        this.prisma.notification.findMany({
          where,
          orderBy: { scheduledFor: 'desc' },
          include: {
            user: true,
            drugSchedule: {
              include: {
                drug: true,
              },
            },
          },
          ...args,
        }),
      () => this.prisma.notification.count({ where }),
      { first, last, before, after },
    ) as unknown as NotificationConnection;
  }

  async markAsRead(
    userId: string,
    notificationId: string,
  ): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new Error('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        read: true,
        readAt: new Date(),
      },
      include: {
        user: true,
        drugSchedule: {
          include: {
            drug: true,
          },
        },
      },
    });
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    });

    return result.count;
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    });
  }

  private async sendNotification(notification: any): Promise<void> {
    this.logger.log(`Sending notification: ${notification.title}`);

    try {
      await this.pubSub.publish('notificationCreated', {
        notificationCreated: notification,
        userId: notification.userId,
      });

      this.logger.log(
        `Notification published to user ${notification.userId}: ${notification.message}`,
      );
    } catch (error) {
      this.logger.error(
        `Error publishing notification to user ${notification.userId}:`,
        error.message,
      );
    }
  }

  getPubSub(): PubSub {
    return this.pubSub;
  }

  private parseTimeToDate(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    if (date < new Date()) {
      date.setDate(date.getDate() + 1);
    }

    return date;
  }
}
