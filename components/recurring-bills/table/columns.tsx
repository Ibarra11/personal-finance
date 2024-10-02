"use client";

import { RecurringBill } from "@/services/recurring-bills/getAllBills";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import RecurringBillsActions from "../RecurringBIllsActions";

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
    accessorKey: "startDate",
    header: "Start Date",
    size: 100, // Adjusted size for Due Date
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.original.startDate}</div>
      );
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    size: 100,
    cell: ({ row }) => {
      return (
        <div className="flex h-10 items-center">{row.original.frequency}</div>
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
      const [isOpen, setIsOpen] = useState(false);
      return (
        <div className="flex items-center justify-center">
          <RecurringBillsActions
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            recurringBill={row.original}
          />
        </div>
      );
    },
  },
];
