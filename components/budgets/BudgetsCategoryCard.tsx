"use client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "@/components/ui/progress";

import LinkWithCaretRight from "../LinkWithCaretRight";
import BudgetActions from "./BudgetActions";
import { Budget } from "@/services/budgets/getAllBudgets";
import BudgetLatestTransactions from "./BudgetLatestTransactions";
import { formatNumber } from "@/lib/utils";

type Props = Pick<
  Budget,
  "id" | "category" | "maxSpend" | "theme" | "transactions" | "totalSpent"
>;

export default function BudgetsCategoryCard({
  id,
  category,
  maxSpend,
  theme,
  totalSpent,
  transactions,
}: Props) {
  const leftoverBudget = Number(maxSpend) - totalSpent;
  const budgetProgress = (totalSpent / Number(maxSpend)) * 100;

  return (
    <Card className="space-y-5 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            style={{ backgroundColor: theme.color }}
            className="size-4 rounded-full"
          ></div>
          <h4 className="text-xl font-bold">{category.name}</h4>
        </div>
        <BudgetActions
          id={id}
          category={category}
          maxSpend={maxSpend}
          theme={theme}
        />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Maximum of ${formatNumber(maxSpend)}
          </p>
          <Progress
            color={theme.color}
            className="rounded-sm p-1"
            value={budgetProgress}
          />
          <div className="grid grid-cols-2">
            <BudgetSummary
              themeColor={theme.color}
              type="spent"
              amount={totalSpent}
            />
            <BudgetSummary type="free" amount={leftoverBudget} />
          </div>
        </div>
        <BudgetLatestTransactions transactions={transactions} />
      </CardContent>
    </Card>
  );
}

function BudgetSummary({
  type,
  amount,
  themeColor,
}: {
  type: "spent" | "free";
  amount: number;
  themeColor?: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        style={{ backgroundColor: themeColor }}
        className={`w-1 rounded-full ${!themeColor ? "bg-background" : ""}`}
      ></div>
      <div className="space-y-1">
        <p className="text-xs capitalize text-gray-500">{type}</p>
        <p className="text-sm font-bold text-gray-900">
          $ {formatNumber(amount)}
        </p>
      </div>
    </div>
  );
}
