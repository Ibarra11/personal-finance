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

export default function EditBudgetDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-red/90 hover:text-red" variant="link" size="sm">
          Delete Budget
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl bg-white px-5 py-6 md:p-8">
        <AlertDialogHeader className="relative">
          <AlertDialogTitle className="text-left text-xl font-bold text-gray-900 lg:text-3xl">
            Delete 'Entertainment'?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left text-sm text-gray-500">
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data inside it will be removed forever.
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
          <Button className="w-full" variant="destructive">
            Yes, Confirm Deletion
          </Button>
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
