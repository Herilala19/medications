import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsDateString,
  IsBoolean,
  Min,
} from 'class-validator';
import { FrequencyUnit } from '../models/frequency-unit.enum';

@InputType()
export class UpdateDrugInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dosage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  unit?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  frequency?: number;

  @Field(() => FrequencyUnit, { nullable: true })
  @IsOptional()
  @IsEnum(FrequencyUnit)
  frequencyUnit?: FrequencyUnit;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
