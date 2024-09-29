"use client";

import SortByDropdown, { SortTableOptions } from "@/components/SortByDropdown";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { ChangeEvent, useMemo, useState } from "react";
import { filterRecurringBills, getPaginatedRecurringBills } from "./helpers";

import { TablePagination } from "@/components/TablePagination";
import { RecurringBillsCardView } from "@/components/recurring-bills/RecurringBillsCardView";
import { RecurringBillsTableView } from "@/components/recurring-bills/table/RecurringBillsTableView";
import RecurringBillsFilterControls from "@/components/recurring-bills/RecurringBillsFilterControls";

interface Props {
  recurringBills: RecurringBill[];
}

export default function RecurringBillsClient({ recurringBills }: Props) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortTableOptions>("Latest");

  function handleBudgetChange(budget: string | null) {
    setPage(1);
    setSelectedBudget(budget);
  }
  function handleSearchTermChange(e: ChangeEvent<HTMLInputElement>) {
    setPage(1);
    setSearchTerm(e.target.value);
  }
  function handleSortOptionChange(sortOption: SortTableOptions) {
    setPage(1);
    setSelectedSortOption(sortOption);
  }
  function handlePageChange(nextPage: number) {
    setPage(nextPage);
  }

  const filteredRecurringBills = useMemo(
    () =>
      filterRecurringBills({
        searchTerm,
        selectedBudget,
        selectedSortOption,
        recurringBills,
      }),
    [selectedBudget, searchTerm, selectedSortOption, recurringBills],
  );

  const { paginatedRecurringBills, totalPages } = getPaginatedRecurringBills({
    currentPage: page,
    allRecurringBills: filteredRecurringBills,
  });

  const budgetCategories = useMemo(() => {
    const categoriesSet = new Set(
      recurringBills.map((bill) => bill.budget.category.name),
    );
    return Array.from(categoriesSet);
  }, [recurringBills]);

  return (
    <Card className="space-y-2 md:space-y-6 lg:flex-1">
      <CardHeader>
        <RecurringBillsFilterControls
          budgetCategories={budgetCategories}
          handleBudgetChange={handleBudgetChange}
          handleSearchTermChange={handleSearchTermChange}
          handleSortOptionChange={handleSortOptionChange}
          selectedBudget={selectedBudget}
          selectedSortOption={selectedSortOption}
        />
      </CardHeader>
      <CardContent>
        <div className="md:hidden">
          <RecurringBillsCardView recurringBills={paginatedRecurringBills} />
        </div>
        <div className="hidden md:block">
          <RecurringBillsTableView recurringBills={paginatedRecurringBills} />
        </div>
      </CardContent>
      <CardFooter className="flex h-16 items-end">
        <TablePagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </CardFooter>
    </Card>
  );
}
