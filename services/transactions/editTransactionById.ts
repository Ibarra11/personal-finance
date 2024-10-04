import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EditTransactionPayload } from "@/actions/transactions/edit-transaction-action";

export async function editTransactionById({
  amount,
  budgetId,
  transaction,
  transactionDate,
  transactionId,
}: EditTransactionPayload) {
  return db
    .update(transactions)
    .set({
      amount,
      budgetId,
      transaction,
      transactionDate,
    })
    .where(eq(transactions.id, transactionId))
    .returning();
}
