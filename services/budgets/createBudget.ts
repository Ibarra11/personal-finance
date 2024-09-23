import { CreateBudget } from "@/actions/budgets/create-budget-action";
import { db } from "@/db";
import { budgets } from "@/db/schema";

export async function createBudget({
  budgetCategoryId,
  budgetThemeId,
  maxSpend,
}: CreateBudget) {
  return db
    .insert(budgets)
    .values({
      categoryId: budgetCategoryId,
      maxSpend,
      themeId: budgetThemeId,
    })
    .returning();
}
