"use client";
import { Category } from "@/services/categories/getAllCategories";
import { Theme } from "@/types";
import { createContext, useContext, ReactNode } from "react";

interface Data {
  themes: Array<Theme & { taken: boolean }>;
  categories: Array<Category & { taken: boolean }>;
}

const BudgetsContext = createContext<Data>({ themes: [], categories: [] });

export default function BudgetsProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: Data;
}) {
  return (
    <BudgetsContext.Provider value={data}>{children}</BudgetsContext.Provider>
  );
}

export function useBudgetsContext() {
  const context = useContext(BudgetsContext);
  return context;
}
