import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';

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
export const schemaTransactionInsert = z.object({
  id: z.optional(z.number()),
  type: z.enum(['income', 'expense', 'transfer']),
  date: z.string().datetime('Date not valid'),
  amount: z.number(),
  categoryId: z.number(),
});
export const schemaTransaction = schemaTransactionInsert.extend({
  id: z.number(),
});

export const schemaCategoryInsert = z.object({
  id: z.optional(z.number()),
  name: z.string().trim(),
  type: z.enum(['income', 'expense']),
});
export const schemaCategory = schemaCategoryInsert.extend({
  id: z.number(),
});
