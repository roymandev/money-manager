import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';
import { minLength, number, picklist, string, transform } from 'valibot';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  type: text('type', { enum: ['income', 'expense', 'transfer'] }).notNull(),
  date: text('date').notNull(),
  amount: integer('amount').notNull(),
  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),
});
export const schemaTransaction = createSelectSchema(transactions);
export const schemaTransactionInsert = createInsertSchema(transactions, {
  type: picklist(['income', 'expense', 'transfer'], 'Type is required'),
  date: string('Date is required', [minLength(1, 'Date is required')]),
  amount: number('Amount is required'),
  categoryId: number('Category is required'),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
});

export const schemaCategory = createSelectSchema(categories);
export const schemaCategoryInsert = createInsertSchema(categories, {
  name: transform(
    string('Name is required', [minLength(1, 'Name is required')]),
    (input) => input.trim()
  ),
  type: picklist(['income', 'expense'], 'Type is required'),
});
