import { getAllBudgets } from "@/services/budgets/getAllBudgets";

export type Budget = Awaited<ReturnType<typeof getAllBudgets>>[number];

export type DeleteBudgetDialog = Pick<Budget, "id" | "category">;
export type BudgetActions = Pick<Budget, "id" | "category">;
