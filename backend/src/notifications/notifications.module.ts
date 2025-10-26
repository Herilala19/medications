import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [NotificationsResolver, NotificationsService, SchedulerService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
