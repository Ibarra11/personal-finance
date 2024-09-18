import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteBudgetById(budgetId: number) {
  return db.delete(budgets).where(eq(budgets.id, budgetId)).returning();
}
