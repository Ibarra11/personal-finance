import { db } from "@/db";
import { budgets, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export type BudgetCategories = Awaited<
  ReturnType<typeof getAllBudgetCategories>
>;

export async function getAllBudgetCategories() {
  return await db
    .selectDistinctOn([budgets.categoryId], {
      category: {
        id: categories.id,
        name: categories.name,
      },
    })
    .from(budgets)
    .innerJoin(categories, eq(budgets.categoryId, categories.id));
}
