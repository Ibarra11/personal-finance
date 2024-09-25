import {
  SummaryCard,
  SummaryItem,
} from "@/components/recurring-bills/SummaryCard";
import { Button } from "@/components/ui/button";
import { BillsCard } from "@/components/recurring-bills/BillsCard";
import TotalBillsCard from "@/components/recurring-bills/TotalBillsCard";
import { BillsTable } from "@/components/recurring-bills/table/BillsTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import IconSearch from "@/public/icons/icon-search.svg";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";

import RecurringBillsProvider from "./page.context";
import { getAllCategories } from "@/services/categories/getAllCategories";
import { InputWithIcon } from "@/components/ui/input";
import SortByDropdown from "@/components/SortByDropdown";
import RecurringBillsCreateDialog from "@/components/recurring-bills/RecurringBillsCreateDialog";
import { getAllBudgets } from "@/services/budgets/getAllBudgets";

export default async function Page() {
  const budgets = await getAllBudgets();
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
          <Card className="space-y-6 lg:flex-1">
            <CardHeader className="flex-row items-center gap-6 md:justify-between">
              <div className="flex-1 md:max-w-[320px]">
                <InputWithIcon
                  variant="start"
                  icon={<IconSearch className="size-4" />}
                  placeholder="search bills"
                />
              </div>
              <Button className="md:hidden" size="icon" variant="ghost">
                <IconSortMobile className="size-4" />
              </Button>
              <div className="hidden md:flex md:items-center md:gap-2">
                <p className="text-sm text-gray-500">Sort By</p>
                {/* <SortByDropdown /> */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="md:hidden">
                <BillsCard />
              </div>
              <div className="sm:hidden md:block">
                <BillsTable data={sampleBills} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RecurringBillsProvider>
  );
}
const sampleBills = [
  {
    bill: "Electricity Bill",
    dueDate: "2024-09-15",
    amount: 100.75,
  },
  {
    bill: "Water Bill",
    dueDate: "2024-09-20",
    amount: 45.5,
  },
  {
    bill: "Internet Bill",
    dueDate: "2024-09-10",
    amount: 60.0,
  },
  {
    bill: "Rent",
    dueDate: "2024-09-01",
    amount: 1500.0,
  },
  {
    bill: "Phone Bill",
    dueDate: "2024-09-18",
    amount: 80.99,
  },
  {
    bill: "Streaming Service",
    dueDate: "2024-09-25",
    amount: 12.99,
  },
];
