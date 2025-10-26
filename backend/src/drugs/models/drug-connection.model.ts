import { ObjectType } from '@nestjs/graphql';
import Paginated from '../../common/pagination/pagination';
import { Drug } from './drug.model';

@ObjectType()
export class DrugConnection extends Paginated(Drug) {}
