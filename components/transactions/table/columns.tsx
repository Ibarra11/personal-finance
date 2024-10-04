"use client";

import { formatNumber } from "@/lib/utils";
import { TransactionWithBudgetCategories } from "@/services/transactions/getAllTransactions";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import TransactionsActions from "../TransactionsActions";

export const columns: ColumnDef<TransactionWithBudgetCategories>[] = [
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
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">
          {row.original.transactionDate.toLocaleDateString("en-GB", {
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
  {
    id: "actions",
    enableHiding: false,
    size: 50,
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="flex items-center justify-center">
          <TransactionsActions
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            transaction={row.original}
          />
        </div>
      );
    },
  },
];
