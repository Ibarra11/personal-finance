import { DeleteTransactionPayload } from "@/actions/transactions/delete-transaction-action";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

export function deleteTransactionById({
  transactionId,
}: DeleteTransactionPayload) {
  return db
    .delete(transactions)
    .where(eq(transactions.id, transactionId))
    .returning();
}
