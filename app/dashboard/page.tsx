import CurrencyCard from "@/components/CurrencyCard";
import PotsCard from "@/components/PotsCard";
import TransactionsCard from "@/components/TransactionsCard";

export default function Page() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      <div className="flex gap-6">
        <div className="flex-1">
          <CurrencyCard
            isFeatured
            title="Current Balance"
            amount={"4,836.00"}
          />
        </div>
        <div className="flex-1">
          <CurrencyCard title="Income" amount={"3,814.25"} />
        </div>
        <div className="flex-1">
          <CurrencyCard title="Expenses" amount={"1,700.50"} />
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <PotsCard />
          <TransactionsCard />
        </div>
        <div className="w-[400px]"></div>
      </div>
    </div>
  );
}
