import { Input, Output } from 'valibot';

import { schemaCategory, schemaCategoryInsert } from '@/schemas';

export type TCategory = Output<typeof schemaCategory>;

export type TCategoryInsert = Input<typeof schemaCategoryInsert>;

export type TCategoryFilters = {
  type: TCategoryInsert['type'];
};
