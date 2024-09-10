"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EditBudgetForm from "./form/EditBudgetForm";
import { CircleX } from "lucide-react";

export default function EditBudgetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          Edit Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Edit Budget
          </DialogTitle>
          <DialogDescription className="text-left text-sm text-gray-500">
            As your budgets change, feel free to update your spending limits.
          </DialogDescription>
          <DialogClose asChild>
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
        <EditBudgetForm />
      </DialogContent>
    </Dialog>
  );
}
