import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

@InputType()
export class UpdateDrugScheduleInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  time?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dosage?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  taken?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  takenAt?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
