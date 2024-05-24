import { z } from 'zod';

import { schemaCategory, schemaCategoryInsert } from '@/schemas';

export type TCategory = z.output<typeof schemaCategory>;

export type TCategoryInsert = z.input<typeof schemaCategoryInsert>;

export type TCategoryFilters = {
  type: TCategoryInsert['type'];
};
