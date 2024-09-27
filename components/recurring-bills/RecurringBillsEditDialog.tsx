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
import { useAction } from "next-safe-action/hooks";

import { useState } from "react";
import { toast } from "sonner";
import ErrorDialogMessage from "../ErrorDialogMessage";
import RecurringBillEditForm from "./form/ReccuringBillEditForm";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { CreateOrEditBillFormSchemaType } from "./form/schema";
import { editRecurringBillAction } from "@/actions/recurring-bills/edit-recurring-bill-action";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface Props {
  recurringBill: RecurringBill;
  onEditComplete: () => void;
}

export default function RecurringBillsEditDialog({
  recurringBill,
  onEditComplete,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { executeAsync, result, isPending, reset } = useAction(
    editRecurringBillAction,
  );

  async function handleRecuringBillEdit({
    amount,
    budgetId,
    name,
    dueDate,
  }: CreateOrEditBillFormSchemaType) {
    const result = await executeAsync({
      recurringBillId: recurringBill.id,
      amount,
      budgetId,
      name,
      dueDate,
    });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(result.data.message);
      onEditComplete();
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
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
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
            Edit Recurring Bill
          </DialogTitle>
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <DialogDescription className="text-left text-sm text-gray-500">
            You are about to make changes to a recurring bill. Adjust the bill
            details as needed, and ensure the payment frequency and due date are
            accurate. These changes will apply to all future payments. Do you
            wish to proceed?
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
        <RecurringBillEditForm
          isDisabled={isPending}
          onRecurringBillEdit={handleRecuringBillEdit}
          recurringBill={recurringBill}
        />
      </DialogContent>
    </Dialog>
  );
}
