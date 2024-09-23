"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import AddBudgetForm from "./form/AddBudgetForm";
import { useState } from "react";
import { AddOrEditFormSchemaType } from "./form/schema";
import { useAction } from "next-safe-action/hooks";
import { createBudgetAction } from "@/actions/budgets/create-budget-action";
import { toast } from "sonner";
import ErrorDialogMessage from "../ErrorDialogMessage";

export default function AddBudgetDialog() {
  const [open, setIsOpen] = useState(false);
  const { executeAsync, isPending, reset, result } =
    useAction(createBudgetAction);
  async function handleBudgetAdd({
    budgetCategory,
    theme,
    maxSpend,
  }: AddOrEditFormSchemaType) {
    const result = await executeAsync({
      budgetCategoryId: budgetCategory.id,
      maxSpend,
      budgetThemeId: theme.id,
    });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(result.data.message);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(newState) => {
        if (!newState && !result.data?.success) {
          reset();
        }
        setIsOpen(newState);
      }}
    >
      <DialogTrigger asChild>
        <Button>+ Add New Budget</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Add Budget
            <DialogClose asChild>
              <Button
                className="group"
                type="button"
                size="icon"
                variant="link"
              >
                <CircleX
                  size={24}
                  className="text-gray-500 group-hover:text-gray-900"
                />
              </Button>
            </DialogClose>
          </DialogTitle>
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <DialogDescription className="text-left text-sm text-gray-500">
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <AddBudgetForm isDisabled={isPending} onBudgetAdd={handleBudgetAdd} />
      </DialogContent>
    </Dialog>
  );
}
