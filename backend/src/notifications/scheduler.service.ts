import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private notificationsService: NotificationsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async generateDrugReminders() {
    this.logger.log('Running scheduled job: Generate drug reminders');
    try {
      await this.notificationsService.generateDrugReminders();
    } catch (error) {
      this.logger.error('Error generating drug reminders:', error);
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async processPendingNotifications() {
    this.logger.log('Running scheduled job: Process pending notifications');
    try {
      await this.notificationsService.processPendingNotifications();
    } catch (error) {
      this.logger.error('Error processing pending notifications:', error);
    }
  }

  @Cron('0 0 * * *')
  async cleanupOldNotifications() {
    this.logger.log('Running scheduled job: Cleanup old notifications');
    // TODO: Implement cleanup logic for old notifications
  }
}
