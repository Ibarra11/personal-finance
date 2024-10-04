import { Budget } from "@/services/budgets/getAllBudgets";
import LinkWithCaretRight from "../LinkWithCaretRight";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatNumber } from "@/lib/utils";

type Props = Pick<Budget, "transactions">;

export default function BudgetLatestTransactions({ transactions }: Props) {
  return (
    <Card className="space-y-5 bg-background p-4 md:p-5">
      <CardHeader className="flex-row items-center justify-between">
        <h4 className="text-base font-bold text-gray-900">Latest Spending</h4>
        <LinkWithCaretRight href="/">See Details</LinkWithCaretRight>
      </CardHeader>
      <CardContent>
        {transactions.map((transaction) => (
          <BudgetTransaction key={transaction.id} {...transaction} />
        ))}
      </CardContent>
    </Card>
  );
}

function BudgetTransaction({
  transaction,
  amount,
  createdAt,
}: Props["transactions"][number]) {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-200 py-3 text-xs first:pt-0 last:border-0 last:pb-0">
      <p className="font-bold text-gray-900">{transaction}</p>
      <div className="space-y-1">
        <p className="font-bold text-gray-900">
          ${formatNumber(Number(amount))}
        </p>
        <p className="text-gray-500">
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
