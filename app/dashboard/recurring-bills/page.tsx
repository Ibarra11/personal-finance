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
import { getPaymentsSum } from "@/services/recurring-bills/getPaymentsSum";
import { formatNumber } from "@/lib/utils";
import { getPaymentsDueSoon, getUpcomingPaymentsThisMonth } from "./helpers";

export default async function Page() {
  const [recurringBills, budgets, payments] = await Promise.all([
    getAllRecurringBills(),
    getAllBudgets(),
    getPaymentsSum(),
  ]);
  const { total, count } = getPaymentsDueSoon(recurringBills);
  const { total: upcomingMonthTotal, count: upcomingMonthCount } =
    getUpcomingPaymentsThisMonth(recurringBills);

  return (
    <RecurringBillsProvider data={{ budgets }}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Recurring Bills</h1>
          <RecurringBillsCreateDialog />
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row md:gap-6">
            <TotalBillsCard />
            <SummaryCard>
              <SummaryItem>
                <p className="text-gray-500">Paid Bills</p>
                <p className="font-bold text-gray-900">
                  {payments.count} (${formatNumber(payments.total || 0)})
                </p>
              </SummaryItem>
              <SummaryItem>
                <p className="text-gray-500">Total Upcoming</p>
                <p className="font-bold text-gray-900">
                  {upcomingMonthCount} (${formatNumber(upcomingMonthTotal)})
                </p>
              </SummaryItem>
              <SummaryItem>
                <p className="text-red">Due Soon</p>
                <p className="font-bold text-red">
                  {count} (${formatNumber(total)})
                </p>
              </SummaryItem>
            </SummaryCard>
          </div>
          <RecurringBillsClient recurringBills={recurringBills} />
        </div>
      </div>
    </RecurringBillsProvider>
  );
}
