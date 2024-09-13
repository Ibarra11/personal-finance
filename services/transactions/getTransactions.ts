import { db } from "@/db";
export type TransactionWithCategory = Awaited<
  ReturnType<typeof getAllTransactions>
>[0];
export async function getAllTransactions() {
  return db.query.transactions.findMany({
    orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
    with: {
      category: {
        columns: {
          name: true,
        },
      },
    },
  });
}
