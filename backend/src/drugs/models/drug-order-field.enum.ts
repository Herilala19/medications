import { registerEnumType } from '@nestjs/graphql';

export enum DrugOrderField {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  NAME = 'NAME',
  START_DATE = 'START_DATE',
}

registerEnumType(DrugOrderField, {
  name: 'DrugOrderField',
  description: 'Fields available for drug ordering',
});
