import {
  SummaryCard,
  SummaryItem,
} from "@/components/recurring-bills/SummaryCard";
import TotalBillsCard from "@/components/recurring-bills/TotalBillsCard";

import RecurringBillsProvider from "./page.context";
import RecurringBillsCreateDialog from "@/components/recurring-bills/RecurringBillsCreateDialog";
import { getAllBudgets } from "@/services/budgets/getAllBudgets";
import { getAllRecurringBills } from "@/services/recurring-bills/getAllBills";
import RecurringBillsClient from "./page.client";

export default async function Page() {
  const [recurringBills, budgets] = await Promise.all([
    getAllRecurringBills(),
    getAllBudgets(),
  ]);

  return (
    <RecurringBillsProvider data={{ budgets }}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Recurring Bills</h1>
          <RecurringBillsCreateDialog />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-3 md:flex-row md:gap-6 lg:w-80 lg:flex-col">
            <TotalBillsCard />
            <SummaryCard>
              <SummaryItem>
                <p className="text-gray-500">Paid Bills</p>
                <p className="font-bold text-gray-900">2 ($320.00)</p>
              </SummaryItem>
              <SummaryItem>
                <p className="text-gray-500">Total Upcoming</p>
                <p className="font-bold text-gray-900">6 ($1,230.00)</p>
              </SummaryItem>
              <SummaryItem>
                <p className="text-red">Due Soon</p>
                <p className="font-bold text-red">2 ($40.00)</p>
              </SummaryItem>
            </SummaryCard>
          </div>
          <RecurringBillsClient recurringBills={recurringBills} />
        </div>
      </div>
    </RecurringBillsProvider>
  );
}
