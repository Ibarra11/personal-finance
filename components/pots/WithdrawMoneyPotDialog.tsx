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
import WithdrawMoneyPotForm from "./form/WithdrawPotForm";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";

import { withdrawMoneyAction } from "@/actions/pots/withdraw-money-action";
import ErrorDialogBadge from "../ErrorDialogMessage";

interface Props {
  potId: number;
  totalSaved: number;
  target: number;
  title: string;
}

export default function WithdrawMoneyPotDialog({
  potId,
  totalSaved,
  target,
  title,
}: Props) {
  const [open, setIsOpen] = useState(false);
  const { execute, result, isPending, reset } = useAction(withdrawMoneyAction);

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
          Withdraw
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
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Withdraw from '{title}'
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
            Withdrawing from 'Savings' will reduce your balance. Make sure this
            is the right action for your financial plans.
          </DialogDescription>
        </DialogHeader>
        <WithdrawMoneyPotForm
          potId={potId}
          isPending={isPending}
          onWithdrawMoney={execute}
          totalSaved={Number(totalSaved)}
          target={Number(target)}
        />
      </DialogContent>
    </Dialog>
  );
}
