"use server";
import { db, eq } from "@/db";
import { expenses } from "@/db/schema/expenses";

export async function viewByDate(date?: string) {
  const dbExpense = db.select().from(expenses);

  if(date) {
   dbExpense.where(eq(expenses.date, date));
  }
  const allExpenses = await dbExpense;
  return allExpenses;
}
