"use client";
import { useState } from "react";
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
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { AddOrEditFormSchemaType } from "./form/schema";
import { createPotAction } from "@/actions/pots/create-pot-action";
import ErrorDialogMessage from "../ErrorDialogMessage";

export default function AddPotDialog() {
  const [open, setIsOpen] = useState(false);
  const { executeAsync, result, isPending } = useAction(createPotAction);
  async function handlePotAdd({
    potName,
    target,
    theme,
  }: AddOrEditFormSchemaType) {
    const result = await executeAsync({
      potName,
      potThemeId: theme.id,
      potTarget: target,
    });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(`Pot ‘${potName}’ created successfully.`);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>+ Add New Pot</Button>
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
            Add Pot
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
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <DialogDescription className="text-left text-sm text-gray-500">
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <AddPotForm isDisabled={isPending} onPotAdd={handlePotAdd} />
      </DialogContent>
    </Dialog>
  );
}
