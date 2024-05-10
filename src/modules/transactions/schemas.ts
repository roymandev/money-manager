import {
  Input,
  Output,
  minLength,
  number,
  object,
  picklist,
  string,
} from 'valibot';

export const schemaBaseTransaction = object({
  id: string('id is required', [minLength(1, 'id is required')]),
  type: picklist(['income', 'expense'], 'type is required'),
  date: string('date is required', [minLength(1, 'date is required')]),
  amount: number('amount is required'),
  category: string('category is required', [
    minLength(1, 'category is required'),
  ]),
});

export type TTransaction = Output<typeof schemaBaseTransaction>;
export type test = Input<typeof schemaBaseTransaction>;

export type TTransactionGroup = {
  date: string;
  items: TTransaction[];
  total: number;
};
