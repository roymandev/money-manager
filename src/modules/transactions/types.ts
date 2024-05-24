import { z } from 'zod';

import { schemaTransaction, schemaTransactionInsert } from '@/schemas';

export type TTransaction = z.output<typeof schemaTransaction>;

export type TTransactionInsert = z.input<typeof schemaTransactionInsert>;

export type TTransactionGroup = {
  date: string;
  items: TTransaction[];
  total: number;
};

export type TTransactionSections = (TTransaction | [string, number])[];

export type TTransactionFilters = {
  dateStart: string;
  dateEnd: string;
};
