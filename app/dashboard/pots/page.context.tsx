"use client";
import { Theme } from "@/types";
import { createContext, useContext, ReactNode } from "react";

interface Data extends Theme {
  taken: boolean;
}

const PotsContext = createContext<{ themes: Data[] }>({ themes: [] });

export default function PotsProvider({
  children,
  themes,
}: {
  children: ReactNode;
  themes: Data[];
}) {
  return (
    <PotsContext.Provider value={{ themes }}>{children}</PotsContext.Provider>
  );
}

export function usePotsContext() {
  const context = useContext(PotsContext);
  return context;
}
