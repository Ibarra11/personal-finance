import { db } from "@/db";

export type Transaction = Awaited<ReturnType<typeof getAllTransactions>>[0];

export async function getAllTransactions() {
  const transactions = await db.query.transactions.findMany({
    orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
    with: {
      budget: {
        columns: {},
        with: {
          category: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  });

  return transactions.map((transaction) => ({
    ...transaction,
    category: transaction.budget.category.name,
  }));
}
