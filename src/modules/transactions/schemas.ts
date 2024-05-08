import { Output, minLength, number, object, picklist, string } from 'valibot';

export const schemaBaseTransaction = object({
  type: picklist(['income', 'expense'], 'type is required'),
  date: string([minLength(1, 'date is required')]),
  amount: number('amount is required'),
});

export type TTransaction = Output<typeof schemaBaseTransaction>;
