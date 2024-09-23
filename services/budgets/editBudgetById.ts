import { EditBudget } from "@/actions/budgets/edit-budget-action";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editBudgetById({
  budgetId,
  categoryId,
  maxSpend,
  themeId,
}: EditBudget) {
  return db
    .update(budgets)
    .set({ categoryId, maxSpend, themeId })
    .where(eq(budgets.id, budgetId))
    .returning();
}
