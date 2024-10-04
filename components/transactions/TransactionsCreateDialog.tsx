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

import TransactionsCreateForm from "./form/TransactionsCreateForm";
import { createTransactionAction } from "@/actions/transactions/create-transaction-action";
import { TransactionFormSchemaType } from "./form/schema";

export default function TransactionsCreateDialog() {
  const [open, setIsOpen] = useState(false);
  const { executeAsync, isPending, reset, result } = useAction(
    createTransactionAction,
  );
  async function handleTransactionCreate(values: TransactionFormSchemaType) {
    const result = await executeAsync(values);
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
        <Button>+ Add New Transaction</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Add Transaction
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
            Add an expense to keep track of where and how you’re spending your
            money. Enter details like the amount, the budget, and date to
            maintain an accurate record of your financial activities.
          </DialogDescription>
        </DialogHeader>
        <TransactionsCreateForm
          isDisabled={isPending}
          onTransactionCreate={handleTransactionCreate}
        />
      </DialogContent>
    </Dialog>
  );
}
