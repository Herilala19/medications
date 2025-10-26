import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { NotificationType } from './notification-type.enum';
import { NotificationStatus } from './notification-status.enum';
import { DrugSchedule } from '../../drugs/models/drug-schedule.model';

@ObjectType()
export class Notification extends BaseModel {
  @Field()
  userId: string;

  @Field({ nullable: true })
  drugScheduleId?: string;

  @Field(() => DrugSchedule, { nullable: true })
  drugSchedule?: DrugSchedule;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  scheduledFor: Date;

  @Field({ nullable: true })
  sentAt?: Date;

  @Field()
  read: boolean;

  @Field({ nullable: true })
  readAt?: Date;

  @Field(() => NotificationStatus)
  status: NotificationStatus;
}
