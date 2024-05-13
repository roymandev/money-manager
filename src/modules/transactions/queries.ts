import { endOfDay, startOfDay } from 'date-fns';
import { between, desc, eq } from 'drizzle-orm';
import { Input } from 'valibot';

import { schemaTransactionInsert, transactions } from '@/schema';
import { db } from '@/utils/database';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TTransaction, TTransactionFilters } from './types';

export const transactionsKeys = createQueryKeys('transactions', {
  all: null,
  list: (filters: TTransactionFilters) => ['list', filters],
  detail: (id: number) => ['detail', id],
});

export const useTransactions = () =>
  useQuery({
    queryKey: transactionsKeys.all.queryKey,
    queryFn: () =>
      db.select().from(transactions).orderBy(desc(transactions.date)),
  });

export const useTransactionsByDate = (start: Date, end: Date) => {
  const dateStart = startOfDay(start).toISOString();
  const dateEnd = endOfDay(end).toISOString();

  return useQuery({
    ...transactionsKeys.list({ dateStart, dateEnd }),
    queryFn: (): Promise<TTransaction[]> =>
      db
        .select()
        .from(transactions)
        .where(between(transactions.date, dateStart, dateEnd))
        .orderBy(desc(transactions.date)),
  });
};

export const useTransactionById = (id: number) =>
  useQuery({
    ...transactionsKeys.detail(id),
    queryFn: () =>
      db.query.transactions.findFirst({
        where: eq(transactions.id, id),
      }),
  });

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

export const useTransactionsEdit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TTransaction) =>
      db.update(transactions).set(data).where(eq(transactions.id, data.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys._def,
      });
    },
  });
};

export const useTransactionsDeleteAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => db.delete(transactions),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys._def,
      });
    },
  });
};
