import { Output, number, object, picklist } from 'valibot';

export const schemaBaseTransaction = object({
  type: picklist(['income', 'expense'], 'type is required'),
  amount: number('amount is required'),
});

export type TTransaction = Output<typeof schemaBaseTransaction>;
