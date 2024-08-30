"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  transactionParty: string;
  category: string;
  date: string;
  amount: string;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionParty",
    header: "Recipient/Sender",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 w-48 items-center truncate text-sm font-bold text-gray-900">
          {row.getValue("transactionParty")}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.getValue("category")}</div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.getValue("date")}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center justify-end text-sm font-bold text-gray-900">
          {row.getValue("amount")}
        </div>
      );
    },
  },
];
