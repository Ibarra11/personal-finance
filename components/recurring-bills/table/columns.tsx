"use client";

import { formatDate } from "@/lib/utils";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RecurringBill>[] = [
  {
    accessorKey: "bill",
    header: "Bill",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 w-48 items-center truncate text-sm font-bold text-gray-900">
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "budgetCategory",
    header: "Budget",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 w-48 items-center truncate text-sm font-bold text-gray-900">
          {row.original.budget.category.name}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.original.dueDate}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center justify-end text-sm font-bold text-gray-900">
          ${row.original.amount}
        </div>
      );
    },
  },
];
