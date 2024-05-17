import { eq } from 'drizzle-orm';

import { categories } from '@/schema';
import { db } from '@/utils/database';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TCategoryFilters, TCategoryInput } from './schema';

export const categoriesKeys = createQueryKeys('categories', {
  all: null,
  list: (filters: TCategoryFilters) => ['list', filters],
  detail: (id: number) => ['detail', id],
});

export const useCategoriesByType = (type: TCategoryInput['type']) =>
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
    mutationFn: (data: TCategoryInput) => db.insert(categories).values(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys._def,
      });
    },
  });
};
