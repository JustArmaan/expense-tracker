"use server";
import { db, eq } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { categories } from "@/db/schema/categories";

export async function getAllExpensesWithCategory(date?: string) {
  if (date) {
    const allExpenses = await db
      .select()
      .from(expenses)
      .innerJoin(categories, eq(expenses.categoryId, categories.id))
      .where(eq(expenses.date, date));

    return allExpenses;
  }
  const allExpenses = await db
    .select()
    .from(expenses)
    .innerJoin(categories, eq(expenses.categoryId, categories.id));

  return allExpenses;
}

export async function getTotalExpenses(date?: string) {
  if (date) {
    const totalExpenses = await db
      .select({ amount: expenses.amount })
      .from(expenses)
      .where(eq(expenses.date, date));

    return totalExpenses;
  }
  const totalExpenses = await db
    .select({ amount: expenses.amount })
    .from(expenses);

  return totalExpenses;
}

export async function getAllCategories() {
  const allCategories = await db.select().from(categories);
  return allCategories;
}
