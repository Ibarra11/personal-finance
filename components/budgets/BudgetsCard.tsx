import { Button } from "../ui/button";
import IconCaretRight from "@/public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "../ui/card";

import BudgetDonut from "./BudgetDonutGraph";
import { getAllBudgets } from "@/services/budgets/getAllBudgets";
import BudgetSummary from "../dashboard/BudgetSummary";

export default async function BudgetsCard() {
  const budgets = await getAllBudgets();
  return (
    <Card className="space-y-5 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between p-0">
        <h3 className="text-xl font-bold">Budgets</h3>
        <Button variant="link" className="items-center gap-3" size="sm">
          See Details
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0 md:flex-row">
        <div className="flex-1">
          <BudgetDonut budgets={budgets} />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {budgets.map((budget) => (
            <BudgetSummary
              name={budget.category.name}
              theme={budget.theme.color}
              totalSpent={budget.totalSpent}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
