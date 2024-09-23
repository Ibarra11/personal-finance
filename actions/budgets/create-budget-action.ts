"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";

import { createBudget } from "@/services/budgets/createBudget";

const createBudgetSchema = z.object({
  budgetCategoryId: z.number(),
  maxSpend: z.string(),
  budgetThemeId: z.number(),
});

export type CreateBudget = z.infer<typeof createBudgetSchema>;

export const createBudgetAction = actionClient
  .schema(createBudgetSchema)
  .action(
    async ({ parsedInput: { budgetCategoryId, maxSpend, budgetThemeId } }) => {
      try {
        const createdBudget = await createBudget({
          budgetCategoryId,
          maxSpend,
          budgetThemeId,
        });

        if (createdBudget.length === 0) {
          return {
            success: false,
            message: "Issue creating budget. Please try again.",
          };
        }

        await revalidatePath("/dashboard/budgets");

        return {
          success: true,
          message: `Budget was successfully created.`,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: `An error occurred while trying to create a budget.`,
        };
      }
    },
  );
