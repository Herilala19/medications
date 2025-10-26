import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class DrugSchedule extends BaseModel {
  @Field()
  drugId: string;

  @Field()
  time: string;

  @Field()
  dosage: string;

  @Field()
  taken: boolean;

  @Field({ nullable: true })
  takenAt?: Date;

  @Field({ nullable: true })
  notes?: string;
}
