import { pgTable, varchar, text, date, numeric } from "drizzle-orm/pg-core";

import { categories } from "./categories";

export const expenses = pgTable("expenses", {
  id: text("id").primaryKey(),
  amount: numeric("amount", { precision: 100, scale: 2 }).notNull(),
  description: varchar("description").notNull(),
  date: date("date").notNull(),
  categoryId: text("category_id").references(() => categories.id),
});

export type Expense = typeof expenses.$inferSelect;
export type ExpenseInsert = typeof expenses.$inferInsert;