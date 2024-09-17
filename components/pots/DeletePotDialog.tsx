"use client";

import { DeletePot, deletePotAction } from "@/actions/pots/delete-pot-action";
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
import { CircleX, Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import ErrorDialogMessage from "../ErrorDialogMessage";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  title: string;
  potId: number;
}

export default function DeletePotDialog({ title, potId }: Props) {
  const [open, setIsOpen] = useState(false);
  const { isPending, result, executeAsync } = useAction(deletePotAction);
  async function handleDeletePot() {
    const result = await executeAsync({ potId });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(`Pot ‘${title}’ deleted successfully.`);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="text-red/90 hover:text-red" variant="link" size="sm">
          Delete Pot
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle className="text-left text-xl font-bold text-gray-900 lg:text-3xl">
            Delete '{title}'?
          </AlertDialogTitle>
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <AlertDialogDescription className="text-left text-sm text-gray-500">
            Are you sure you want to delete this pot? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </AlertDialogDescription>
          <AlertDialogCancel asChild>
            <Button
              className="group absolute -top-4 right-0"
              type="button"
              size="icon"
              variant="link"
              disabled={isPending}
            >
              <CircleX
                size={24}
                className="text-gray-500 group-hover:text-gray-900"
              />
            </Button>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="space-y-4 text-center">
          <Button
            onClick={handleDeletePot}
            className="w-full"
            variant="destructive"
            disabled={isPending}
          >
            <span className={`${isPending ? "invisible" : ""}`}>
              Yes, Confirm Deletion
            </span>
            {isPending && <Loader className="absolute size-4 animate-spin" />}
          </Button>
          <AlertDialogCancel asChild>
            <Button disabled={isPending} size="sm" variant="link">
              No, Go Back
            </Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
