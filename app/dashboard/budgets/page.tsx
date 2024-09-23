import AddBudgetDialog from "@/components/budgets/AddBudgetDialog";
import BudgetDonutGraph from "@/components/budgets/BudgetDonutGraph";
import BudgetsCategoryCard from "@/components/budgets/BudgetsCategoryCard";
import { Card } from "@/components/ui/card";
import { getAllBudgets } from "@/services/budgets/getAllBudgets";
import { getAllThemes } from "@/services/themes/getAllThemes";
import BudgetsProvider from "./page.context";
import { getAllCategories } from "@/services/categories/getAllCategories";

export default async function Page() {
  const [budgets, themes, categories] = await Promise.all([
    getAllBudgets(),
    getAllThemes(),
    getAllCategories(),
  ]);
  const updatedThemes = themes.map((theme) => ({
    ...theme,
    taken: Boolean(budgets.find((budget) => budget.themeId === theme.id)),
  }));
  const updatedCategories = categories.map((category) => ({
    ...category,
    taken: Boolean(budgets.find((budget) => budget.categoryId === category.id)),
  }));

  return (
    <BudgetsProvider
      data={{ themes: updatedThemes, categories: updatedCategories }}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Budgets</h1>
          <AddBudgetDialog />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <Card className="flex flex-col gap-8 px-5 py-6 md:flex-row md:p-8 lg:min-w-96 lg:flex-col">
            <div className="flex-1">
              <BudgetDonutGraph />
            </div>
            <div className="space-y-6 md:w-72">
              <h4 className="text-lg font-bold text-gray-900">
                Spending Summary
              </h4>
              <div>
                <CompactBudgetCategory />
                <CompactBudgetCategory />
                <CompactBudgetCategory />
                <CompactBudgetCategory />
              </div>
            </div>
          </Card>
          <div className="space-y-6 lg:flex-1">
            {budgets.map((budget) => (
              <BudgetsCategoryCard key={budget.id} {...budget} />
            ))}
          </div>
        </div>
      </div>
    </BudgetsProvider>
  );
}

function CompactBudgetCategory() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex gap-4">
        <div className="w-1 rounded-full bg-green"></div>
        <p className="text-sm text-gray-500">Bills</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-base font-bold">$250.00</p>
        <p className="text-xs text-gray-500">of 750.00</p>
      </div>
    </div>
  );
}
