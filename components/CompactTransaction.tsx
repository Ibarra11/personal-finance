import { Transaction } from "@/services/transactions/getAllTransactions";

export default function CompactTransaction({
  party,
  category,
  amount,
  createdAt,
  type,
}: Transaction) {
  return (
    <div className="flex justify-between">
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-900">{party}</p>
        <p className="text-xs text-gray-500">{category}</p>
      </div>
      <div className="space-y-2">
        <p
          className={`text-sm font-bold ${type === "deposit" ? "text-green" : "text-gray-900"}`}
        >
          {type === "deposit" ? "+" : "-"}${amount}
        </p>
        <p className="text-xs text-gray-500">
          {createdAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
