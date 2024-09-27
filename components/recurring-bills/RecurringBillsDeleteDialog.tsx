"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../SubmitButton";
import ErrorDialogMessage from "../ErrorDialogMessage";
import { deleteRecurringBillAction } from "@/actions/recurring-bills/delete-recurring-bill";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface Props {
  recurringBillId: number;
  name: string;
}

export default function RecurringBillsDeleteDialog({
  recurringBillId,
  name,
}: Props) {
  const [open, setIsOpen] = useState(false);
  const { isPending, result, executeAsync, reset } = useAction(
    deleteRecurringBillAction,
  );
  async function handleDeleteRecurringBill() {
    const result = await executeAsync({ recurringBillId });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(result.data.message);
    }
  }
  return (
    <AlertDialog
      open={open}
      onOpenChange={(newState) => {
        if (!newState && !result.data?.success) {
          reset();
        }
        setIsOpen(newState);
      }}
    >
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle className="text-left text-xl font-bold text-gray-900 lg:text-3xl">
            Delete '{name}'?
          </AlertDialogTitle>
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <AlertDialogDescription className="text-left text-sm text-gray-500">
            Are you sure you want to delete this recurring billl? This action
            cannot be reversed, and all the data inside it will be removed
            forever.
          </AlertDialogDescription>
          <AlertDialogCancel asChild>
            <Button
              className="group absolute -top-4 right-0"
              type="button"
              size="icon"
              variant="link"
            >
              <CircleX
                size={24}
                className="text-gray-500 group-hover:text-gray-900"
              />
            </Button>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="space-y-4 text-center">
          <SubmitButton
            text="Yes, Confirm Deletion"
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteRecurringBill}
          />
          <AlertDialogCancel asChild>
            <Button size="sm" variant="link">
              No, Go Back
            </Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
