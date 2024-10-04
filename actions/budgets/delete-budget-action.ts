"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";
import { deleteBudgetById } from "@/services/budgets/deleteBudgetById";

const deleteBudgetSchema = z.object({
  budgetId: z.number({ required_error: "budgetId is required" }),
});

export type DeleteBudget = z.infer<typeof deleteBudgetSchema>;

export const deleteBudgetAction = actionClient
  .schema(deleteBudgetSchema)
  .action(async ({ parsedInput: { budgetId } }) => {
    try {
      const deletedPot = await deleteBudgetById(budgetId);

      if (deletedPot.length === 0) {
        return {
          success: false,
          message: "Issue deleting budget. Please try again.",
        };
      }

      await revalidatePath("/dashboard/budgets");

      return {
        success: true,
        message: `Budget with ID ${budgetId} successfully deleted.`,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while trying to delete the budget.",
      };
    }
  });
