import BudgetsCard from "@/components/budgets/BudgetsCard";
import CurrencyCard from "@/components/CurrencyCard";
import PotsCard from "@/components/dashboard/PotsCard";
import TransactionsCard from "@/components/dashboard/TransactionsCard";

import RecurringBillsCard from "@/components/RecurringBillsCard";

export default function Page() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
      <div className="flex flex-col gap-3 md:flex-row md:gap-6">
        <div className="md:flex-1">
          {/* <CurrencyCard
            isFeatured
            title="Current Balance"
            amount={"4,836.00"}
          /> */}
        </div>
        <div className="md:flex-1">
          {/* <CurrencyCard title="Income" amount={"3,814.25"} /> */}
        </div>
        <div className="md:flex-1">
          {/* <CurrencyCard title="Expenses" amount={"1,700.50"} /> */}
        </div>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4 md:space-y-6">
          <PotsCard />
          <TransactionsCard />
        </div>
        <div className="space-y-4 md:space-y-6 lg:w-[400px]">
          {/* <BudgetsCard /> */}
          {/* <RecurringBillsCard /> */}
        </div>
      </div>
    </div>
  );
}
