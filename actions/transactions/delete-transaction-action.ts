"use server";

import { actionClient } from "@/actions/safe-action";
import { deleteTransactionById } from "@/services/transactions/deleteTransactionById";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const deleteTransactionSchema = z.object({
  transactionId: z.number({ required_error: "budgetId is required" }),
});

export type DeleteTransactionPayload = z.infer<typeof deleteTransactionSchema>;

export const deleteTransactionAction = actionClient
  .schema(deleteTransactionSchema)
  .action(async ({ parsedInput: { transactionId } }) => {
    try {
      const createdTransaction = await deleteTransactionById({
        transactionId,
      });
      if (createdTransaction.length === 0) {
        return {
          success: false,
          message: "Issue deleting transaction. Please try again.",
        };
      }

      await revalidatePath("/dashboard/transactions");

      return {
        success: true,
        message: `Transaction was successfully deleted.`,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `An error occurred while trying to delete a transaction.`,
      };
    }
  });
