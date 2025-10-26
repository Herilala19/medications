import { Module } from '@nestjs/common';
import { DrugsResolver, DrugScheduleResolver } from './drugs.resolver';
import { DrugsService } from './drugs.service';

@Module({
  providers: [DrugsResolver, DrugScheduleResolver, DrugsService],
  exports: [DrugsService],
})
export class DrugsModule {}
