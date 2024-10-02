"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";
import { editRecurringBillById } from "@/services/recurring-bills/editRecurringBillById";
import { createOrEditBillFormSchema } from "@/components/recurring-bills/form/schema";

const editRecurringBillSchema = createOrEditBillFormSchema.merge(
  z.object({
    recurringBillId: z.number(),
  }),
);

export type EditRecurringBill = z.infer<typeof editRecurringBillSchema>;

export const editRecurringBillAction = actionClient
  .schema(editRecurringBillSchema)
  .action(
    async ({
      parsedInput: {
        recurringBillId,
        name,
        startDate,
        budgetId,
        amount,
        frequency,
      },
    }) => {
      try {
        const editedRecurringBill = await editRecurringBillById({
          recurringBillId,
          amount,
          name,
          startDate,
          budgetId,
          frequency,
        });

        if (editedRecurringBill.length === 0) {
          return {
            success: false,
            message: "Issue updating the recurring bill. Please try again.",
          };
        }

        // Revalidate path dynamically, this can be modified as needed
        await revalidatePath("/dashboard/recurring-bills");

        return {
          success: true,
          message: `Recurring Bill "${name}" was successfully updated.`,
        };
      } catch (error) {
        console.error("Error updating recurring bill:", error); // Log the error for debugging
        return {
          success: false,
          message:
            "An error occurred while trying to update the recurring bill.",
        };
      }
    },
  );
