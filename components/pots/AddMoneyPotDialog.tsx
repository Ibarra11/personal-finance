"use client";
import { CircleAlert } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
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
import { addMoneyAction } from "@/actions/pots/add-money-action";
import AddMoneyPotForm from "./form/AddMoneyPotForm";
import { useEffect, useState } from "react";
import ErrorDialogBadge from "../ErrorDialogMessage";

interface Props {
  potId: number;
  totalSaved: number;
  target: number;
  title: string;
}

export default function AddMoneyPotDialog({
  potId,
  totalSaved,
  target,
  title,
}: Props) {
  const [open, setIsOpen] = useState(false);
  const { execute, result, isPending, reset } = useAction(addMoneyAction);

  useEffect(() => {
    if (result.data?.success) {
      setIsOpen(false);
    }
  }, [result]);

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
        <Button variant="secondary" className="w-full">
          + Add Money
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          if (isPending) {
            e.preventDefault();
          }
        }}
        className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 pb-6 pt-4 md:pb-8 md:pt-6"
      >
        <DialogHeader className="space-y-4 pt-2 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Add to '{title}'
            <DialogClose asChild>
              <Button
                className="group"
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
            </DialogClose>
          </DialogTitle>
          {result.data?.success === false && (
            <ErrorDialogBadge message={result.data.message} />
          )}
          <DialogDescription className="text-left text-sm text-gray-500">
            Enter the amount you'd like to add to your savings. Every
            contribution brings you one step closer to your target.
          </DialogDescription>
        </DialogHeader>
        <AddMoneyPotForm
          potId={potId}
          totalSaved={totalSaved}
          target={target}
          onAddMoney={execute}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
