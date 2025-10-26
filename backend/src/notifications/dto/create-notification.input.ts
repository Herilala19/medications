import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { NotificationType } from '../models/notification-type.enum';

@InputType()
export class CreateNotificationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  drugScheduleId?: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type: NotificationType;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  message: string;

  @Field()
  @IsDateString()
  scheduledFor: string;
}
