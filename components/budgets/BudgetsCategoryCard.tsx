import Link from "next/link";
import { Transaction } from "../transaction-table/columns";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "@/components/ui/progress";

import IconEllipsis from "@/public/icons/icon-ellipsis.svg";
import LinkWithCaretRight from "../LinkWithCaretRight";
import CompactTransaction from "../CompactTransaction";

interface Props {
  category: string;
  budget: number;
  spent: number;
  latestTransactions?: Array<Transaction>;
}

export default function BudgetsCategoryCard({
  category,
  budget,
  spent,
  latestTransactions,
}: Props) {
  const leftoverBudget = budget - spent;
  return (
    <Card className="space-y-5 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-green size-4 rounded-full"></div>
          <h4 className="text-xl font-bold">{category}</h4>
        </div>
        <Button variant="ghost" size="icon">
          <IconEllipsis className="size-4 text-gray-300" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Maximum of ${budget}</p>
          <Progress
            color="bg-green"
            className="rounded-sm bg-background p-1"
            value={33}
          />
          <div className="grid grid-cols-2">
            <BudgetSummary type="spent" amount={25} />
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
}: {
  type: "spent" | "free";
  amount: number;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-1 rounded-full ${type === "spent" ? "bg-green" : "bg-background"}`}
      ></div>
      <div className="space-y-1">
        <p className="text-xs capitalize text-gray-500">{type}</p>
        <p className="text-sm font-bold text-gray-900">${amount}</p>
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
