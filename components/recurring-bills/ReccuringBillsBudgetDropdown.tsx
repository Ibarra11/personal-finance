"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  budgetCategories: Array<string>;
  selectedBudget: string | null;
  onBudgetChange: (budget: string | null) => void;
}

export default function RecurringBillsBudgetDropdown({
  budgetCategories,
  selectedBudget,
  onBudgetChange,
}: Props) {
  return (
    <Select
      value={selectedBudget ?? "all"}
      onValueChange={(value) => {
        if (value === "all") {
          return onBudgetChange(null);
        }
        return onBudgetChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Budgets</SelectItem>
        {budgetCategories.map((budget) => (
          <SelectItem key={budget} value={budget}>
            {budget}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
