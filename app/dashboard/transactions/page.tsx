import PageClient from "./page.client";
import { getAllTransactions } from "@/services/transactions/getAllTransactions";
import { getAllCategories } from "@/services/categories/getAllCategories";

export default async function Page() {
  const [transactions, categories] = await Promise.all([
    getAllTransactions(),
    getAllCategories(),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
      <PageClient
        transactions={transactions}
        categories={categories.map((category) => category.name)}
      />
    </div>
  );
}
