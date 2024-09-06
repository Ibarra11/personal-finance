"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bill = {
  bill: string;
  dueDate: string;
  amount: number;
};

export const columns: ColumnDef<Bill>[] = [
  {
    accessorKey: "bill",
    header: "Bill",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 w-48 items-center truncate text-sm font-bold text-gray-900">
          {row.getValue("bill")}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.getValue("dueDate")}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center justify-end text-sm font-bold text-gray-900">
          ${row.getValue("amount")}
        </div>
      );
    },
  },
];
