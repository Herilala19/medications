import { ObjectType } from '@nestjs/graphql';
import Paginated from '../../common/pagination/pagination';
import { Notification } from './notification.model';

@ObjectType()
export class NotificationConnection extends Paginated(Notification) {}
