import { db } from "@/db";

export type Budget = Awaited<ReturnType<typeof getAllBudgets>>[number];

export async function getAllBudgets() {
  const budgets = await db.query.budgets.findMany({
    with: {
      category: {
        columns: {
          id: true,
          name: true,
        },
      },
      theme: {
        columns: {
          id: true,
          name: true,
          color: true,
        },
      },
      transactions: {
        columns: {
          id: true,
          transaction: true,
          amount: true,
          createdAt: true,
        },
        orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
      },
    },
    orderBy: (budgets, { desc }) => [desc(budgets.updatedAt)],
  });

  return budgets.map((budget) => {
    const totalSpent = budget.transactions.reduce(
      (total, transaction) => total + Number(transaction.amount),
      0,
    );

    const displayedTransactions = budget.transactions.slice(0, 3);

    return {
      ...budget,
      totalSpent,
      transactions: displayedTransactions,
    };
  });
}
