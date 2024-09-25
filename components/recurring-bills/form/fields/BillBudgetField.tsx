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

import { useRef } from "react";
import { CircleCheck } from "lucide-react";
import { CreateOrEditBillFormType } from "../schema";
import { useRecurringBillsContext } from "@/app/dashboard/recurring-bills/page.context";
export default function BillBudgetField({
  form,
}: {
  form: CreateOrEditBillFormType;
}) {
  const { budgets } = useRecurringBillsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const isInDisabledFieldset = Boolean(
    ref.current?.closest("fieldset:disabled"),
  );

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
          >
            <FormControl>
              <SelectTrigger disabled={isInDisabledFieldset} ref={ref}>
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
