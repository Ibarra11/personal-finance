"use client";

import { formatNumber } from "@/lib/utils";
import { Transaction } from "@/services/transactions/getAllTransactions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction",
    header: "Transaction",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 w-48 items-center truncate text-sm font-bold text-gray-900">
          {row.original.transaction}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.original.category}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">
          {row.original.createdAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
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
          className={`flex h-10 items-center justify-end text-sm font-bold text-gray-900`}
        >
          ${formatNumber(row.original.amount)}
        </div>
      );
    },
  },
];
