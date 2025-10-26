import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateDrugScheduleInput {
  @Field()
  @IsString()
  drugId: string;

  @Field()
  @IsString()
  time: string;

  @Field()
  @IsString()
  dosage: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
