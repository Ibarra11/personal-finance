import { db } from "@/db";
export type TransactionWithCategory = Awaited<
  ReturnType<typeof getAllTransactions>
>[0];
export async function getAllTransactions() {
  return db.query.transactions.findMany({
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
  });
}
