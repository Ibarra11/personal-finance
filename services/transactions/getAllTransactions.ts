import { db } from "@/db";

export type TransactionWithBudgetCategories = Awaited<
  ReturnType<typeof getAllTransactions>
>[0];

interface Props {
  limit?: number;
}

export async function getAllTransactions({ limit }: Props) {
  const transactions = await db.query.transactions.findMany({
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
    orderBy: (transactions, { desc }) => [desc(transactions.transactionDate)],
    limit: limit,
  });

  return transactions.map((transaction) => ({
    ...transaction,
    category: transaction.budget.category.name,
  }));
}
