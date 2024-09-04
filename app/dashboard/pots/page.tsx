import PotsCard from "@/components/pots/PotsCard";
import { Button } from "@/components/ui/button";

export default async function Pots() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Pots</h1>
        <Button className="h-auto py-4">+ Add New Pot</Button>
      </div>
      <div className="space-y-6">
        <PotsCard pot="Savings" totalSaved={159} target={2000} />
        <PotsCard pot="Savings" totalSaved={159} target={2000} />
        <PotsCard pot="Savings" totalSaved={159} target={2000} />
        <PotsCard pot="Savings" totalSaved={159} target={2000} />
      </div>
    </div>
  );
}
