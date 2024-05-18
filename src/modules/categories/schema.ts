import {
  Input,
  Output,
  minLength,
  number,
  object,
  picklist,
  string,
} from 'valibot';

import { categories } from '@/schema';

export const schemaCategory = object({
  id: number(),
  name: string('Name is required', [minLength(1, 'Name is required')]),
  type: picklist(['income', 'expense'], 'Type is required'),
} satisfies Record<keyof typeof categories._.columns, any>);

export type TCategory = Output<typeof schemaCategory>;

export type TCategoryInput = Input<typeof schemaCategory>;

export type TCategoryFilters = {
  type: TCategoryInput['type'];
};
