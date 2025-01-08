"use server";
import { db, eq } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { revalidatePath } from "next/cache";

export async function deleteExpense(id: string) {
    try {
        await db.delete(expenses).where(eq(expenses.id, id));
        revalidatePath("/");
    } catch (error) {
        throw new Error("Failed to delete expense");
    }
}
