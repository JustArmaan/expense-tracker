import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
export type Category = typeof categories.$inferSelect;
