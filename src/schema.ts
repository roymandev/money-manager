import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-valibot';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  type: text('type', { enum: ['income', 'expense', 'transfer'] }).notNull(),
  date: text('date').notNull(),
  amount: integer('amount').notNull(),
  category: text('category').notNull(),
});

export const schemaTransactionInsert = createInsertSchema(transactions);
export const schemaTransactionSelect = createSelectSchema(transactions);
