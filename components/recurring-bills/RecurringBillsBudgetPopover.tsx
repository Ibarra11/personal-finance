"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconFilterMobile from "@/public/icons/icon-filter-mobile.svg";

import { useState } from "react";

interface Props {
  budgets: string[];
  selectedBudget: string | null;
  onBudgetChange: (BudgetCategoryField: string | null) => void;
}

export default function RecurringBillsBudgetPopover({
  budgets,
  selectedBudget,
  onBudgetChange,
}: Props) {
  const [open, setIsOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open budget options for recurring bills"
        >
          <IconFilterMobile className="size-5 text-gray-900" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        alignOffset={-20}
        className="flex w-44 flex-col p-1"
      >
        <Button
          onClick={() => {
            setIsOpen(false);
            onBudgetChange(null);
          }}
          className={`h-10 w-full justify-start text-gray-900 hover:bg-accent hover:text-gray-900 focus-visible:bg-accent ${selectedBudget === null ? "font-bold text-gray-900" : "text-gray-500"}`}
          size="sm"
          variant="ghost"
        >
          All Budgets
        </Button>
        {budgets.map((budget) => (
          <Button
            key={budget}
            onClick={() => {
              setIsOpen(false);
              onBudgetChange(budget);
            }}
            className={`h-10 w-full justify-start text-gray-900 hover:bg-accent hover:text-gray-900 focus-visible:bg-accent ${selectedBudget === budget ? "font-bold text-gray-900" : "text-gray-500"}`}
            size="sm"
            variant="ghost"
          >
            {budget}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
