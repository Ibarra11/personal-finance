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

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import ErrorDialogMessage from "../ErrorDialogMessage";

import { createTransactionAction } from "@/actions/transactions/create-transaction-action";
import { TransactionFormSchemaType } from "./form/schema";
import { TransactionWithBudgetCategories } from "@/services/transactions/getAllTransactions";
import TransactionsEditForm from "./form/TransactionsEditForm";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { editTransactionAction } from "@/actions/transactions/edit-transaction-action";

interface Props {
  transaction: TransactionWithBudgetCategories;
  onEditComplete: () => void;
}

export default function TransactionsEditDialog({
  transaction,
  onEditComplete,
}: Props) {
  const [open, setIsOpen] = useState(false);
  const { executeAsync, isPending, reset, result } = useAction(
    editTransactionAction,
  );
  async function handleTransactionEdit(values: TransactionFormSchemaType) {
    const result = await executeAsync({
      ...values,
      transactionId: transaction.id,
    });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(result.data.message);
      onEditComplete();
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Edit Transaction
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
            Use this dialog to modify the details of an existing transaction.
            You can update the amount, category, date, and any notes associated
            with the transaction. Ensure all fields are correct before saving
            changes, as this will impact your financial summary. Click ‘Save’ to
            apply your changes or ‘Cancel’ to discard them.
          </DialogDescription>
        </DialogHeader>
        <TransactionsEditForm
          isDisabled={isPending}
          onTransactionEdit={handleTransactionEdit}
          transaction={transaction}
        />
      </DialogContent>
    </Dialog>
  );
}
