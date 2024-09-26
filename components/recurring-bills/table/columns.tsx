"use client";

import { deleteRecurringBillAction } from "@/actions/recurring-bills/delete-recurring-bill";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";

import { ColumnDef } from "@tanstack/react-table";
import { Loader, MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export const columns: ColumnDef<RecurringBill>[] = [
  {
    accessorKey: "bill",
    header: "Bill",
    size: 200, // Fixed width for Bill
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center truncate text-sm font-bold text-gray-900">
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "budget",
    header: "Budget",
    size: 150, // Reduced width for Budget
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center truncate text-sm text-gray-900">
          {row.original.budget.category.name}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    size: 100, // Adjusted size for Due Date
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.original.dueDate}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    size: 100, // Fixed width for Amount
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center justify-end text-sm font-bold text-gray-900">
          ${row.original.amount}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 50, // Fixed width for Actions
    cell: ({ row }) => {
      const { executeAsync, isPending } = useAction(deleteRecurringBillAction);

      async function handleRecurringBillEdit() {
        const response = await executeAsync({
          recurringBillId: row.original.id,
        });
        if (response?.data?.success) {
          toast.success(response.data.message);
        } else {
          toast.error(
            response?.data?.message ??
              "There was an issue deleting the recurring bill",
          );
        }
      }
      return (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`h-8 w-8 p-0`}>
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleRecurringBillEdit}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
