"use client";
import { createContext, useContext, ReactNode } from "react";
import { Budget } from "../budgets/types";

interface Data {
  budgets: Array<Budget>;
}

const RecurringBillsContext = createContext<Data>({ budgets: [] });

export default function RecurringBillsProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: Data;
}) {
  return (
    <RecurringBillsContext.Provider value={data}>
      {children}
    </RecurringBillsContext.Provider>
  );
}

export function useRecurringBillsContext() {
  const context = useContext(RecurringBillsContext);
  return context;
}
