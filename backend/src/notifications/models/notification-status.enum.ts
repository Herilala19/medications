import { registerEnumType } from '@nestjs/graphql';
import { NotificationStatus as PrismaNotificationStatus } from '@prisma/client';

export { PrismaNotificationStatus as NotificationStatus };

registerEnumType(PrismaNotificationStatus, {
  name: 'NotificationStatus',
  description: 'Status of notification',
});
