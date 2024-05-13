import { Input, Output } from 'valibot';

import { schemaTransactionInsert, schemaTransactionSelect } from '@/schema';

export type TTransaction = Output<typeof schemaTransactionSelect>;

export type TTransactionInput = Input<typeof schemaTransactionInsert>;

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
