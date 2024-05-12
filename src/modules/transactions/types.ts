import { Output } from 'valibot';

import { schemaTransactionSelect } from '@/schema';

export type TTransaction = Output<typeof schemaTransactionSelect>;

export type TTransactionGroup = {
  date: string;
  items: TTransaction[];
  total: number;
};
