import { Output } from 'valibot';

import { schemaTransactionSelect } from '@/schema';

export type TTransaction = Output<typeof schemaTransactionSelect>;

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
