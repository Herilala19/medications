import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { DrugOrderField } from '../models/drug-order-field.enum';
import { OrderDirection } from '../../common/order/order-direction';

@InputType()
export class DrugOrderInput {
  @Field(() => DrugOrderField)
  @IsEnum(DrugOrderField)
  field: DrugOrderField;

  @Field(() => OrderDirection)
  @IsEnum(OrderDirection)
  direction: OrderDirection;
}
