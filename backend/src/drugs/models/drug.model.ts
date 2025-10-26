import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { FrequencyUnit } from './frequency-unit.enum';
import { DrugSchedule } from './drug-schedule.model';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Drug extends BaseModel {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  dosage: string;

  @Field()
  unit: string;

  @Field(() => Int)
  frequency: number;

  @Field(() => FrequencyUnit)
  frequencyUnit: FrequencyUnit;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  isActive: boolean;

  @Field()
  userId: string;

  @Field(() => [DrugSchedule])
  schedules: DrugSchedule[];
}
