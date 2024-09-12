"use client";

import { TransactionWithCategory } from "@/services/transactions/getAllTransactions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TransactionWithCategory>[] = [
  {
    accessorKey: "transactionParty",
    header: "Recipient/Sender",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 w-48 items-center truncate text-sm font-bold text-gray-900">
          {row.original.party}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">
          {row.original.category.name}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">
          {new Date(row.original.createdAt).toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return (
        <div
          className={`flex h-10 items-center justify-end text-sm font-bold ${row.original.type === "deposit" ? "text-green" : "text-gray-900"}`}
        >
          {row.original.type === "deposit" ? "+" : "-"}${row.original.amount}
        </div>
      );
    },
  },
];
