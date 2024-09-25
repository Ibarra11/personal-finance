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
import { CreateOrEditBillFormSchemaType } from "./form/schema";
import CreateBillForm from "./form/CreateBillForm";
import { createRecurringBillAction } from "@/actions/recurring-bills/create-recurring-bill";

export default function RecurringBillsCreateDialog() {
  const [open, setIsOpen] = useState(false);
  const { executeAsync, isPending, reset, result } = useAction(
    createRecurringBillAction,
  );
  async function handleRecurringBillCreate(
    values: CreateOrEditBillFormSchemaType,
  ) {
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
        <Button>+ Add New Bill</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Add Bill
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
            This bill is marked as recurring. Would you like to automatically
            log it each time it’s due? Recurring bills will be recorded on the
            specified schedule for easier tracking and organization. You can
            modify or stop the recurrence at any time.
          </DialogDescription>
        </DialogHeader>
        <CreateBillForm
          onRecurringBillCreate={handleRecurringBillCreate}
          isDisabled={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
