"use client";

import { BudgetCategories } from "@/services/budgets/getAllBudgetCategories";
import { createContext, useContext, ReactNode } from "react";

interface Data {
  budgetCategories: BudgetCategories;
}

const TransactionsDataContext = createContext<Data>({
  budgetCategories: [],
});

export default function TransactionsDataProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: Data;
}) {
  return (
    <TransactionsDataContext.Provider value={data}>
      {children}
    </TransactionsDataContext.Provider>
  );
}

export function useTransactionsDataContext() {
  const context = useContext(TransactionsDataContext);
  return context;
}
