import { endOfDay, startOfDay } from 'date-fns';
import { between, desc } from 'drizzle-orm';
import { Input } from 'valibot';

import { schemaTransactionInsert, transactions } from '@/schema';
import { db } from '@/utils/database';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TTransaction, TTransactionFilters } from './types';

export const transactionsKeys = createQueryKeys('transactions', {
  all: null,
  list: (filters: TTransactionFilters) => ['list', filters],
});

export const useTransactions = () =>
  useQuery({
    queryKey: transactionsKeys.all.queryKey,
    queryFn: () =>
      db.select().from(transactions).orderBy(desc(transactions.date)),
  });

export const useTransactionsByDate = (startDate: Date, endDate: Date) => {
  const start = startOfDay(startDate).toISOString();
  const end = endOfDay(endDate).toISOString();

  return useQuery({
    ...transactionsKeys.list({ date: { start, end } }),
    queryFn: (): Promise<TTransaction[]> =>
      db
        .select()
        .from(transactions)
        .where(between(transactions.date, start, end))
        .orderBy(desc(transactions.date)),
  });
};

export const useTransactionsAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Input<typeof schemaTransactionInsert>) =>
      db.insert(transactions).values(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys._def,
      });
    },
  });
};
