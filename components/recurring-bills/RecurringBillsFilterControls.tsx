import RecurringBillsBudgetDropdown from "@/components/recurring-bills/ReccuringBillsBudgetDropdown";
import { InputWithIcon } from "@/components/ui/input";
import SortByDropdown from "@/components/SortByDropdown";
import IconSearch from "@/public/icons/icon-search.svg";

import { ChangeEvent } from "react";
import RecurringBillsBudgetPopover from "./RecurringBillsBudgetPopover";
import SortOptionsPopover from "../SortOptionsPopover";
import { SortTableOptions } from "@/types";

interface Props {
  handleSearchTermChange: (searchTerm: ChangeEvent<HTMLInputElement>) => void;
  handleSortOptionChange: (sortOption: SortTableOptions) => void;
  selectedSortOption: SortTableOptions;
  budgetCategories: string[];
  handleBudgetChange: (budget: string | null) => void;
  selectedBudget: string | null;
}

export default function RecurringBillsFilterControls(props: Props) {
  return (
    <div className="flex items-center gap-6 md:justify-between">
      <div className="hidden md:contents">
        <FilterControls {...props} />
      </div>
      <div className="contents md:hidden">
        <MobileFilterControls {...props} />
      </div>
    </div>
  );
}

function FilterControls({
  handleSearchTermChange,
  handleSortOptionChange,
  selectedSortOption,
  budgetCategories,
  handleBudgetChange,
  selectedBudget,
}: Props) {
  return (
    <>
      <div className="flex-1 md:max-w-[320px]">
        <InputWithIcon
          variant="end"
          icon={<IconSearch className="size-4" />}
          placeholder="search bills"
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <p className="text-sm text-gray-500">Sort By</p>
        <SortByDropdown
          onSortOptionChange={handleSortOptionChange}
          sortOption={selectedSortOption}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Budget</p>
        <RecurringBillsBudgetDropdown
          budgetCategories={budgetCategories}
          onBudgetChange={handleBudgetChange}
          selectedBudget={selectedBudget}
        />
      </div>
    </>
  );
}

function MobileFilterControls({
  handleSearchTermChange,
  handleSortOptionChange,
  selectedSortOption,
  budgetCategories,
  handleBudgetChange,
  selectedBudget,
}: Props) {
  return (
    <>
      <div className="flex-1">
        <InputWithIcon
          variant="end"
          icon={<IconSearch className="size-4" />}
          placeholder="search bills"
          onChange={handleSearchTermChange}
        />
      </div>
      <SortOptionsPopover
        onSortOptionChange={handleSortOptionChange}
        sortOption={selectedSortOption}
      />
      <RecurringBillsBudgetPopover
        budgets={budgetCategories}
        onBudgetChange={handleBudgetChange}
        selectedBudget={selectedBudget}
      />
    </>
  );
}
