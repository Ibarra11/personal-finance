import { TransactionWithBudgetCategories } from "@/services/transactions/getAllTransactions";

export default function CompactTransaction({
  transaction,
  category,
  amount,
  transactionDate,
}: TransactionWithBudgetCategories) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-900">{transaction}</p>
        <p className="text-xs text-gray-500">{category}</p>
      </div>
      <div className="space-y-2">
        <p className={`text-sm font-bold text-gray-900`}>-${amount}</p>
        <p className="text-xs text-gray-500">
          {transactionDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
