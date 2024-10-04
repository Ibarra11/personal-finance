import { TransactionFormSchemaType } from "@/components/transactions/form/schema";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { formatDate } from "../helpers";

export async function createTransaction({
  amount,
  budgetId,
  date,
  transaction,
}: TransactionFormSchemaType) {
  return db
    .insert(transactions)
    .values({
      amount,
      budgetId,
      createdAt: date,
      transaction,
    })
    .returning();
}
