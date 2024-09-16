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
import AddPotForm from "./form/AddPotForm";
import React from "react";
import { toast } from "sonner";

export default function AddPotDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add New Pot</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <DialogHeader className="space-y-4 lg:space-y-5">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Add Pot
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
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <AddPotForm />
      </DialogContent>
    </Dialog>
  );
}
