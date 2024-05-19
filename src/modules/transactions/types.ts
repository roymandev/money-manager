import { Input, Output } from 'valibot';

import { schemaTransaction, schemaTransactionInsert } from '@/schemas';

export type TTransaction = Output<typeof schemaTransaction>;

export type TTransactionInsert = Input<typeof schemaTransactionInsert>;

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
