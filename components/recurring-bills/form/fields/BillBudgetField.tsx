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
import { CreateOrEditBillFormType } from "../schema";
import { useRecurringBillsContext } from "@/app/dashboard/recurring-bills/page.context";
export default function BillBudgetField({
  form,
  currentBudgetId,
  isDisabled,
}: {
  form: CreateOrEditBillFormType;
  currentBudgetId?: number;
  isDisabled: boolean;
}) {
  const { budgets } = useRecurringBillsContext();

  return (
    <FormField
      control={form.control}
      name="budgetId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Budget</FormLabel>
          <Select
            onValueChange={(e) => {
              const budget = budgets.find((budget) => budget.id === Number(e));
              if (budget) {
                field.onChange(budget.id);
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
              {budgets.map((budget) => (
                <SelectItem
                  key={budget.id}
                  className="group rounded-none border-b border-gray-100 last:border-b-0 hover:bg-none focus-visible:bg-none"
                  value={String(budget.id)}
                >
                  <div className="flex w-[var(--radix-popper-anchor-width)] items-center gap-3 rounded-md group-[data-state=open]:hover:bg-accent group-[data-state=open]:focus-visible:bg-accent">
                    <p className="text-sm">{budget.category.name}</p>
                    <div className="invisible ml-auto group-data-[state=checked]:visible">
                      <CircleCheck className="size-4 fill-green text-white" />
                    </div>
                    {field.value &&
                      currentBudgetId &&
                      currentBudgetId !== field.value &&
                      budget.id === currentBudgetId && (
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
            This budget will be used to track and manage the recurring bill. All
            payments made towards this recurring bill will be deducted from the
            selected budget.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
