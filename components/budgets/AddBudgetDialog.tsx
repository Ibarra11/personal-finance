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
import AddBudgetForm from "./form/AddBudgetForm";

export default function AddBudgetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add New Budget</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[560px] bg-white p-8">
        <DialogHeader className="relative">
          <DialogTitle className="text-3xl font-bold text-gray-900">
            Add Budget
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
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
        <AddBudgetForm />
      </DialogContent>
    </Dialog>
  );
}
