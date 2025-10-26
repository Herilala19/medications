import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UserEntity } from '../common/decorators/user.decorator';
import { NotificationsService } from './notifications.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './models/notification.model';
import { NotificationConnection } from './models/notification-connection.model';
import { PaginationArgs } from '../common/pagination/pagination.args';
import { User } from '@prisma/client';

@Resolver(() => Notification)
@UseGuards(GqlAuthGuard)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => NotificationConnection)
  async notifications(
    @UserEntity() user: User,
    @Args() pagination: PaginationArgs,
    @Args('unreadOnly', { nullable: true }) unreadOnly?: boolean,
  ): Promise<NotificationConnection> {
    return this.notificationsService.findUserNotifications(
      user.id,
      pagination,
      unreadOnly,
    );
  }

  @Query(() => Int)
  async unreadNotificationCount(@UserEntity() user: any): Promise<number> {
    return this.notificationsService.getUnreadCount(user.id);
  }

  @Mutation(() => Notification)
  async createNotification(
    @UserEntity() user: User,
    @Args('input') input: CreateNotificationInput,
  ): Promise<Notification> {
    return (await this.notificationsService.createNotification(
      user.id,
      input,
    )) as any;
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(
    @UserEntity() user: User,
    @Args('id') id: string,
  ): Promise<Notification> {
    return (await this.notificationsService.markAsRead(user.id, id)) as any;
  }

  @Mutation(() => Int)
  async markAllNotificationsAsRead(@UserEntity() user: any): Promise<number> {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Subscription(() => Notification, {
    filter: (payload, variables, context) => {
      console.log('Subscription filter called with context:', {
        hasExtra: !!context?.extra,
        hasReq: !!context?.req,
        extraUser: context?.extra?.user,
        reqUser: context?.req?.user,
      });

      // Safely access user ID from context
      // For graphql-ws, user is in context.extra.user
      // For subscriptions-transport-ws, user is in context.req.user
      const userId = context?.extra?.user?.id || context?.req?.user?.id;

      if (!userId) {
        console.log('Subscription filter: No user ID found in context');
        return false;
      }

      const payloadUserId = payload.notificationCreated?.userId;
      const match = payloadUserId === userId;

      console.log(
        `Subscription filter: userId=${userId}, payload.userId=${payloadUserId}, match=${match}`,
      );

      return match;
    },
  })
  notificationCreated() {
    return this.notificationsService
      .getPubSub()
      .asyncIterator('notificationCreated');
  }
}
