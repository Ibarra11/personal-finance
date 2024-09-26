"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";

import { deleteRecurringBillById } from "@/services/recurring-bills/deleteRecurringBillById";

const deleteRecurringBillSchema = z.object({
  recurringBillId: z
    .number({ required_error: "recurringBillId is required" })
    .positive("recurringBillId must be a positive number"),
});

export type DeleteRecurringBillInput = z.infer<
  typeof deleteRecurringBillSchema
>;

export const deleteRecurringBillAction = actionClient
  .schema(deleteRecurringBillSchema)
  .action(async ({ parsedInput: { recurringBillId } }) => {
    try {
      const deletedRecurringBill = await deleteRecurringBillById({
        recurringBillId,
      });

      if (deletedRecurringBill.length === 0) {
        return {
          success: false,
          message: "Issue deleting recurring bill. Please try again.",
        };
      }

      await revalidatePath("/dashboard/recurring-bills");

      return {
        success: true,
        message: `${deletedRecurringBill[0].name} was succesfully deleted`,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while trying to delete the recurring bill",
      };
    }
  });
