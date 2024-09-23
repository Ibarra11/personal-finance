"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";
import { editBudgetById } from "@/services/budgets/editBudgetById";

const editBudgetSchema = z.object({
  budgetId: z.number({ required_error: "potId is required" }),
  categoryId: z.number(),
  maxSpend: z.string(),
  themeId: z.number(),
});

export type EditBudget = z.infer<typeof editBudgetSchema>;

export const editBudgetAction = actionClient
  .schema(editBudgetSchema)
  .action(
    async ({ parsedInput: { budgetId, categoryId, maxSpend, themeId } }) => {
      try {
        const editedBudget = await editBudgetById({
          budgetId,
          categoryId,
          maxSpend,
          themeId,
        });

        if (editedBudget.length === 0) {
          return {
            success: false,
            message: "Issue editing budget. Please try again.",
          };
        }

        await revalidatePath("/dashboard/budgets");

        return {
          success: true,
          message: `Budgvet with ID ${budgetId} successfully edited.`,
        };
      } catch (error) {
        return {
          success: false,
          message: `An error occurred while trying to edit pot with ID ${budgetId} .`,
        };
      }
    },
  );
