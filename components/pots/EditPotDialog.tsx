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
import EditPotForm from "./form/EditPotForm";
import { Pot } from "@/types";
import { useAction } from "next-safe-action/hooks";
import { editPotAction } from "@/actions/pots/edit-pot-action";
import { AddOrEditFormSchemaType } from "./form/schema";
import { useState } from "react";
import { toast } from "sonner";
import ErrorDialogMessage from "../ErrorDialogMessage";

type Props = Pick<Pot, "id" | "name" | "target" | "theme">;

export default function EditPotDialog({ id, name, target, theme }: Props) {
  const [open, setIsOpen] = useState(false);
  const { executeAsync, result, isPending, reset } = useAction(editPotAction);
  async function handlePotEdit({
    potName,
    target,
    theme,
  }: AddOrEditFormSchemaType) {
    const result = await executeAsync({
      potId: id,
      potName,
      potThemeId: theme.id,
      potTarget: target,
    });
    if (result?.data?.success) {
      setIsOpen(false);
      toast.success(`Pot ‘${potName}’ updated successfully.`);
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
        <Button variant="link" size="sm">
          Edit Pot
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
        <DialogHeader className="relative">
          <DialogTitle className="flex items-center justify-between text-left text-xl font-bold text-gray-900 md:text-3xl">
            Edit Pot
          </DialogTitle>
          {!isPending && result.data?.success === false && (
            <ErrorDialogMessage message={result.data.message} />
          )}
          <DialogDescription className="text-left text-sm text-gray-500">
            If your saving targets change, feel free to update your pots.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              className="group absolute -top-2 right-0"
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
        </DialogHeader>
        <EditPotForm
          isDisabled={isPending}
          name={name}
          target={target}
          theme={theme}
          onPotEdit={handlePotEdit}
        />
      </DialogContent>
    </Dialog>
  );
}
