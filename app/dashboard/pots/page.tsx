import AddPotDialog from "@/components/pots/AddPotDialog";
import PotsCard from "@/components/pots/PotsCard";
import { getAllPots } from "@/services/pots/getAllPots";
import React from "react";

export default async function Pots() {
  const pots = await getAllPots();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pots</h1>
        <AddPotDialog />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {pots.map((pot) => (
          <PotsCard key={pot.id} {...pot} />
        ))}
      </div>
    </div>
  );
}
