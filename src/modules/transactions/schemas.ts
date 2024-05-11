import { Output, minLength, number, object, picklist, string } from 'valibot';

export const schemaBaseTransaction = object({
  id: string([minLength(1, 'id is required')]),
  type: picklist(['income', 'expense'], 'type is required'),
  date: string([minLength(1, 'date is required')]),
  amount: number('amount is required'),
  category: string([minLength(1, 'category is required')]),
});

export type TTransaction = Output<typeof schemaBaseTransaction>;

export type TTransactionGroup = {
  date: string;
  items: TTransaction[];
  total: number;
};
