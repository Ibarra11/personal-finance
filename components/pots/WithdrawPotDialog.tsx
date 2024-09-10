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
import WithdrawPortForm from "./form/WithdrawPotForm";

export default function WithDrawPotDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Withdraw from 'Savings'
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
          <DialogDescription className="text-left text-sm text-gray-500">
            Withdrawing from 'Savings' will reduce your balance. Make sure this
            is the right action for your financial plans.
          </DialogDescription>
        </DialogHeader>
        <WithdrawPortForm totalSaved={100} target={2000} />
      </DialogContent>
    </Dialog>
  );
}
