"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { CircleCheck } from "lucide-react";

import { TransactionFormType } from "../schema";
import { useTransactionsDataContext } from "../../TransactionsDataProvider";
export default function TransactionBudgetField({
  form,
  currentBudgetId,
  isDisabled,
}: {
  form: TransactionFormType;
  currentBudgetId?: number;
  isDisabled: boolean;
}) {
  const { budgetCategories } = useTransactionsDataContext();

  return (
    <FormField
      control={form.control}
      name="budgetId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Budget</FormLabel>
          <Select
            onValueChange={(e) => {
              const budget = budgetCategories.find(
                ({ category }) => category.id === Number(e),
              );
              if (budget) {
                field.onChange(budget.category.id);
              }
            }}
            defaultValue={field.value ? String(field.value) : undefined}
          >
            <FormControl>
              <SelectTrigger disabled={isDisabled}>
                <SelectValue placeholder="Select a budget" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-72" side="bottom" align="start">
              {budgetCategories.map(({ category }) => (
                <SelectItem
                  key={category.id}
                  className="group rounded-none border-b border-gray-100 last:border-b-0 hover:bg-none focus-visible:bg-none"
                  value={String(category.id)}
                >
                  <div className="flex w-[var(--radix-popper-anchor-width)] items-center gap-3 rounded-md group-[data-state=open]:hover:bg-accent group-[data-state=open]:focus-visible:bg-accent">
                    <p className="text-sm">{category.name}</p>
                    <div className="invisible ml-auto group-data-[state=checked]:visible">
                      <CircleCheck className="size-4 fill-green text-white" />
                    </div>
                    {field.value &&
                      currentBudgetId &&
                      currentBudgetId !== field.value &&
                      category.id === currentBudgetId && (
                        <div className="ml-auto text-xs text-gray-500">
                          Current Budget
                        </div>
                      )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            This transaction will be used to track and manage your expenses. All
            expenses recorded will be deducted from the selected budget, helping
            you keep an accurate record of your spending.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
