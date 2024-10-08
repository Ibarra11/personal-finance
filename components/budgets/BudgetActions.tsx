"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconEllipsis from "@/public/icons/icon-ellipsis.svg";
import EditBudgetDialog from "./EditBudgetDialog";
import DeleteBudgetDialog from "./DeleteBudgetDialog";
import type { BudgetActions } from "@/app/dashboard/budgets/types";

export default function BudgetActions({
  id,
  category,
  maxSpend,
  theme,
}: BudgetActions) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconEllipsis className="size-4 text-gray-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-fit flex-col items-start p-2 text-left"
      >
        <EditBudgetDialog
          id={id}
          category={category}
          maxSpend={maxSpend}
          theme={theme}
        />
        <div className="my-1 h-px self-stretch bg-gray-100 px-5"></div>
        <DeleteBudgetDialog id={id} category={category} />
      </PopoverContent>
    </Popover>
  );
}
