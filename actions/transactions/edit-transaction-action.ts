"use server";

import { actionClient } from "@/actions/safe-action";
import { revalidatePath } from "next/cache";
import { transactionFormSchema } from "@/components/transactions/form/schema";
import { z } from "zod";
import { editTransactionById } from "@/services/transactions/editTransactionById";

const editTransactionSchema = transactionFormSchema.merge(
  z.object({
    transactionId: z.number(),
  }),
);

export type EditTransactionPayload = z.infer<typeof editTransactionSchema>;

export const editTransactionAction = actionClient
  .schema(editTransactionSchema)
  .action(
    async ({
      parsedInput: {
        amount,
        budgetId,
        transactionDate,
        transaction,
        transactionId,
      },
    }) => {
      try {
        const createdTransaction = await editTransactionById({
          amount,
          budgetId,
          transactionDate,
          transaction,
          transactionId,
        });
        if (createdTransaction.length === 0) {
          return {
            success: false,
            message: "Issue editing transaction. Please try again.",
          };
        }

        await revalidatePath("/dashboard/transactions");

        return {
          success: true,
          message: `Transaction was successfully edited.`,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: `An error occurred while trying to edit a transaction.`,
        };
      }
    },
  );
