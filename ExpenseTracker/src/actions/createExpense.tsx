"use server";
import { db, eq } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { ExpenseInsert } from "@/db/schema/expenses";
import { revalidatePath } from "next/cache";

export async function createExpense({
  id,
  description,
  amount,
  date,
  categoryId,
}: ExpenseInsert) {
  if (description.length < 3) {
    throw new Error("Description should contain at least 3 characters");
  }
  if (!amount || !description) {
    throw new Error("Amount and Description must be filled out");
  }
  if (!categoryId) {
    throw new Error("Category must be selected");
  }
  try {
    await db.insert(expenses).values({
      id,
      description,
      date: date,
      amount: amount,
      categoryId,
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to add expense");
  }
}
