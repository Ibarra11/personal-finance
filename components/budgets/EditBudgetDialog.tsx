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
import EditBudgetForm from "./form/EditBudgetForm";
import { CircleX } from "lucide-react";
import { BudgetActions } from "@/app/dashboard/budgets/types";
import { useAction } from "next-safe-action/hooks";
import { editBudgetAction } from "@/actions/budgets/edit-budget-action";
import { AddOrEditFormSchemaType } from "./form/schema";
import { useState } from "react";
import { toast } from "sonner";
import ErrorDialogMessage from "../ErrorDialogMessage";

export default function EditBudgetDialog({
  id,
  category,
  maxSpend,
  theme,
}: BudgetActions) {
  const [isOpen, setIsOpen] = useState(false);
  const { executeAsync, result, isPending, reset } =
    useAction(editBudgetAction);

  async function handleBudgetEdit({
    budgetCategory,
    maxSpend,
    theme,
  }: AddOrEditFormSchemaType) {
    const result = await executeAsync({
      budgetId: id,
      categoryId: budgetCategory.id,
      maxSpend,
      themeId: theme.id,
    });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(`Budget updated successfully.`);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newState) => {
        if (!newState && !result.data?.success) {
          reset();
        }
        setIsOpen(newState);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Edit Budget
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          if (isPending) {
            e.preventDefault();
          }
        }}
        className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8"
      >
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Edit Budget
          </DialogTitle>
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <DialogDescription className="text-left text-sm text-gray-500">
            As your budgets change, feel free to update your spending limits.
          </DialogDescription>
          <DialogClose disabled={isPending} asChild>
            <Button
              className="group absolute -top-2 right-0"
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
        </DialogHeader>
        <EditBudgetForm
          id={id}
          maxSpend={maxSpend}
          category={category}
          theme={theme}
          isDisabled={isPending}
          onBudgetEdit={handleBudgetEdit}
        />
      </DialogContent>
    </Dialog>
  );
}
