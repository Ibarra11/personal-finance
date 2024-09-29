"use client";

import SortByDropdown, { SortTableOptions } from "@/components/SortByDropdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { InputWithIcon } from "@/components/ui/input";

import IconSearch from "@/public/icons/icon-search.svg";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { ChangeEvent, useMemo, useState } from "react";
import { filterRecurringBills, getPaginatedRecurringBills } from "./helpers";
import RecurringBillsBudgetDropdown from "@/components/recurring-bills/ReccuringBillsBudgetDropdown";
import { TablePagination } from "@/components/TablePagination";
import { RecurringBillsCardView } from "@/components/recurring-bills/RecurringBillsCardView";
import { RecurringBillsTableView } from "@/components/recurring-bills/table/RecurringBillsTableView";

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
      <CardHeader className="flex-row items-center gap-6 md:justify-between">
        <div className="flex-1 md:max-w-[320px]">
          <InputWithIcon
            variant="end"
            icon={<IconSearch className="size-4" />}
            placeholder="search bills"
            onChange={handleSearchTermChange}
          />
        </div>
        <Button className="md:hidden" size="icon" variant="ghost">
          <IconSortMobile className="size-4" />
        </Button>
        <div className="hidden md:flex md:items-center md:gap-2">
          <p className="text-sm text-gray-500">Sort By</p>
          <SortByDropdown
            onSortOptionChange={handleSortOptionChange}
            sortOption={selectedSortOption}
          />
        </div>
        <div className="hidden md:flex md:items-center md:gap-2">
          <p className="text-sm text-gray-500">Budget</p>
          <RecurringBillsBudgetDropdown
            budgetCategories={budgetCategories}
            onBudgetChange={handleBudgetChange}
            selectedBudget={selectedBudget}
          />
        </div>
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
