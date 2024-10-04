import PageClient from "./page.client";
import { getAllTransactions } from "@/services/transactions/getAllTransactions";
import { getAllBudgetCategories } from "@/services/budgets/getAllBudgetCategories";
import TransactionsDataProvider from "@/components/transactions/TransactionsDataProvider";
import TransactionsCreateDialog from "@/components/transactions/TransactionsCreateDialog";

export default async function Page() {
  const [transactions, budgetCategories] = await Promise.all([
    getAllTransactions({}),
    getAllBudgetCategories(),
  ]);

  return (
    <TransactionsDataProvider data={{ budgetCategories }}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <TransactionsCreateDialog />
        </div>

        <PageClient
          transactions={transactions}
          categories={budgetCategories.map(({ category }) => category.name)}
        />
      </div>
    </TransactionsDataProvider>
  );
}
