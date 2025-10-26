import { ObjectType } from '@nestjs/graphql';
import Paginated from '../../common/pagination/pagination';
import { DrugSchedule } from './drug-schedule.model';

@ObjectType()
export class DrugScheduleConnection extends Paginated(DrugSchedule) {}
