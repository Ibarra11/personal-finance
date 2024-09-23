"use client";
import {
  FormControl,
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

import { useBudgetsContext } from "@/app/dashboard/budgets/page.context";
import { useRef } from "react";
import { CircleCheck } from "lucide-react";
import { AddOrEditFormType } from "../schema";
export default function AddBudgetCategoryField({
  form,
}: {
  form: AddOrEditFormType;
}) {
  const { categories } = useBudgetsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const isInDisabledFieldset = Boolean(
    ref.current?.closest("fieldset:disabled"),
  );

  return (
    <FormField
      control={form.control}
      name="budgetCategory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Budget Category</FormLabel>
          <Select
            defaultValue={field.value && String(field.value.id)}
            onValueChange={(e) => {
              field.onChange(
                categories.find((category) => category.id === Number(e)),
              );
            }}
          >
            <FormControl>
              <SelectTrigger disabled={isInDisabledFieldset} ref={ref}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-72" side="bottom" align="start">
              {categories.map((category) => (
                <SelectItem
                  disabled={category.taken}
                  defaultChecked={field.value && field.value.id === category.id}
                  key={category.id}
                  className="group rounded-none border-b border-gray-100 last:border-b-0 hover:bg-none focus-visible:bg-none"
                  value={String(category.id)}
                >
                  <div className="flex w-[var(--radix-popper-anchor-width)] items-center gap-3 rounded-md group-[data-state=open]:hover:bg-accent group-[data-state=open]:focus-visible:bg-accent">
                    <p className="text-sm">{category.name}</p>

                    <div className="invisible ml-auto group-data-[state=checked]:visible">
                      <CircleCheck className="size-4 fill-green text-white" />
                    </div>
                    {category.taken && (
                      <p className="ml-auto text-xs text-gray-500">
                        Already Taken
                      </p>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
