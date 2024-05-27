import { SQL, eq } from 'drizzle-orm';

import { categories } from '@/schemas';
import { dependOn } from '@/utils';
import { db } from '@/utils/database';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TCategory, TCategoryFilters, TCategoryInsert } from './types';

export const categoriesKeys = createQueryKeys('categories', {
  list: (filters: Partial<TCategoryFilters>) => ['list', filters],
  detail: (id?: number) => ['detail', id],
});

export const useCategoriesByType = (type: TCategoryInsert['type']) =>
  useQuery({
    ...categoriesKeys.list({ type }),
    queryFn: () =>
      db.query.categories.findMany({
        where: eq(categories.type, type),
      }),
  });

export const useCategoryAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCategoryInsert) => db.insert(categories).values(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.list({ type: variables.type }).queryKey,
      });
    },
  });
};

export const useCategoryDetail = (id?: number) => {
  return useQuery({
    ...categoriesKeys.detail(id),
    queryFn: dependOn(id, async (dep) => {
      const filter: SQL<unknown> | undefined = eq(categories.id, dep);
      //   if (type) filter = and(filter, eq(categories.type, type));
      const data = await db.query.categories.findFirst({ where: filter });

      return data || null;
    }),
    enabled: !!id,
  });
};

export const useCategoryEdit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCategory) =>
      db.update(categories).set(data).where(eq(categories.id, data.id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.list({ type: variables.type }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.detail(variables.id).queryKey,
      });
    },
  });
};

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCategory) =>
      db.delete(categories).where(eq(categories.id, data.id)),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.list({ type: variables.type }).queryKey,
      });
    },
  });
};
