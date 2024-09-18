"use client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "@/components/ui/progress";

import LinkWithCaretRight from "../LinkWithCaretRight";
import BudgetActions from "./BudgetActions";
import { Budget } from "@/services/budgets/getAllBudgets";

type Props = Pick<
  Budget,
  | "id"
  | "category"
  | "maxSpend"
  | "createdAt"
  | "theme"
  | "transactions"
  | "totalSpent"
>;

export default function BudgetsCategoryCard({
  id,
  category,
  maxSpend,
  createdAt,
  theme,
  totalSpent,
}: Props) {
  const leftoverBudget = Number(maxSpend) - totalSpent;
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
        <BudgetActions id={id} category={category} />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Maximum of ${maxSpend}</p>
          <Progress color={theme.color} className="rounded-sm p-1" value={33} />
          <div className="grid grid-cols-2">
            <BudgetSummary
              themeColor={theme.color}
              type="spent"
              amount={totalSpent}
            />
            <BudgetSummary type="free" amount={leftoverBudget} />
          </div>
        </div>
        <BudgetLatestTransactions />
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
          $
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
}

function BudgetLatestTransactions() {
  return (
    <Card className="space-y-5 bg-background p-4 md:p-5">
      <CardHeader className="flex-row items-center justify-between">
        <h4 className="text-base font-bold text-gray-900">Latest Spending</h4>
        <LinkWithCaretRight href="/">See Details</LinkWithCaretRight>
      </CardHeader>
      <CardContent>
        <BudgetTransaction />
        <BudgetTransaction />
        <BudgetTransaction />
      </CardContent>
    </Card>
  );
}

function BudgetTransaction() {
  return (
    <div className="flex items-center justify-between border-b border-b-gray-200 py-3 text-xs first:pt-0 last:border-0 last:pb-0">
      <p className="font-bold text-gray-900">Papa Software</p>
      <div className="space-y-1">
        <p className="font-bold text-gray-900">$16.00</p>
        <p className="text-gray-500">16 Aug 24</p>
      </div>
    </div>
  );
}
