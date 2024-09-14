import { db } from "@/db";

export type Budget = Awaited<ReturnType<typeof getAllBudgets>>[number];

export async function getAllBudgets() {
  const budgets = await db.query.budgets.findMany({
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      theme: {
        columns: {
          color: true,
        },
      },
      // Fetch all transactions for total spent calculation
      transactions: {
        columns: {
          party: true,
          type: true,
          amount: true,
          createdAt: true,
        },
        orderBy: (transactions, { desc }) => [desc(transactions.createdAt)],
      },
    },
  });

  return budgets.map((budget) => {
    const totalSpent = budget.transactions
      .filter((transaction) => transaction.type === "payment")
      .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const displayedTransactions = budget.transactions.slice(0, 3);

    return {
      ...budget,
      totalSpent,
      transactions: displayedTransactions,
    };
  });
}
