import { registerEnumType } from '@nestjs/graphql';
import { FrequencyUnit as PrismaFrequencyUnit } from '@prisma/client';

export { PrismaFrequencyUnit as FrequencyUnit };

registerEnumType(PrismaFrequencyUnit, {
  name: 'FrequencyUnit',
  description: 'Frequency unit for drug administration',
});
