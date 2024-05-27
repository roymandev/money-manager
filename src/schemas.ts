import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { number } from 'zod';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey(),
  type: text('type', { enum: ['income', 'expense', 'transfer'] }).notNull(),
  date: text('date').notNull(),
  amount: integer('amount').notNull(),
  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
});

// Relations
export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

// Schemas
export const schemaTransactionInsert = createInsertSchema(transactions, {
  date: (data) => data.date.datetime('Date is not valid'),
  categoryId: number({
    message: 'Required',
  }),
});
export const schemaTransaction = createSelectSchema(transactions);

export const schemaCategoryInsert = createInsertSchema(categories, {
  name: (data) => data.name.trim(),
});
export const schemaCategory = createSelectSchema(categories);
