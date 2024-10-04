import { TransactionFormSchemaType } from "@/components/transactions/form/schema";
import { db } from "@/db";
import { transactions } from "@/db/schema";

export async function createTransaction({
  amount,
  budgetId,
  transactionDate,
  transaction,
}: TransactionFormSchemaType) {
  return db
    .insert(transactions)
    .values({
      amount,
      budgetId,
      transactionDate,
      transaction,
    })
    .returning();
}
