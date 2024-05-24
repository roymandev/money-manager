import { z } from 'zod';

import { schemaTransaction, schemaTransactionInsert } from '@/schemas';

export type TTransaction<E = Record<string, any>> = z.output<
  typeof schemaTransaction
> &
  E;

export type TTransactionInsert = z.input<typeof schemaTransactionInsert>;

export type TTransactionGroup = {
  date: string;
  items: TTransaction[];
  total: number;
};

export type TTransactionFilters = {
  dateStart: string;
  dateEnd: string;
};
