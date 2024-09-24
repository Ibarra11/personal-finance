import { db } from "@/db";

export type Transaction = Awaited<ReturnType<typeof getAllTransactions>>[0];

interface Props {
  limit?: number;
}

export async function getAllTransactions({ limit }: Props) {
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
    limit: limit,
  });

  return transactions.map((transaction) => ({
    ...transaction,
    category: transaction.budget.category.name,
  }));
}
