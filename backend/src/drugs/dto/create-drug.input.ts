import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsDateString,
  Min,
} from 'class-validator';
import { FrequencyUnit } from '../models/frequency-unit.enum';

@InputType()
export class CreateDrugInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  dosage: string;

  @Field()
  @IsString()
  unit: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  frequency: number;

  @Field(() => FrequencyUnit)
  @IsEnum(FrequencyUnit)
  frequencyUnit: FrequencyUnit;

  @Field()
  @IsDateString()
  startDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
