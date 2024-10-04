"use server";

import { actionClient } from "@/actions/safe-action";
import { revalidatePath } from "next/cache";
import { transactionFormSchema } from "@/components/transactions/form/schema";
import { createTransaction } from "@/services/transactions/createTransaction";

export const createTransactionAction = actionClient
  .schema(transactionFormSchema)
  .action(async ({ parsedInput: { amount, budgetId, date, transaction } }) => {
    try {
      const createdTransaction = await createTransaction({
        amount,
        budgetId,
        date,
        transaction,
      });
      if (createdTransaction.length === 0) {
        return {
          success: false,
          message: "Issue creating transaction. Please try again.",
        };
      }

      await revalidatePath("/dashboard/transactions");

      return {
        success: true,
        message: `Transaction was successfully created.`,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `An error occurred while trying to create a Transaction.`,
      };
    }
  });
