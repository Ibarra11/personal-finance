import { SortTableOptions } from "@/components/SortByDropdown";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";

export const TRANSACTIONS_PER_PAGE = 10;

export function filterRecurringBills({
  recurringBills,
  selectedBudget,
  searchTerm,
  selectedSortOption,
}: {
  recurringBills: Array<RecurringBill>;
  selectedBudget: string | null;
  searchTerm: string;
  selectedSortOption: SortTableOptions;
}) {
  let filteredRecurringBills: Array<RecurringBill>;

  if (!selectedBudget && !searchTerm) {
    //   spread transasctions, so when we change sortOption we have new array and Tanstack table will re-render
    filteredRecurringBills = [...recurringBills];
  } else {
    filteredRecurringBills = recurringBills.filter((recurringBill) => {
      const matchesCategory = selectedBudget
        ? recurringBill.budget.category.name === selectedBudget
        : true;

      const matchesSearchTerm = searchTerm
        ? recurringBill.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearchTerm;
    });
  }

  const result = sortRecurringBills({
    filteredRecurringBills,
    sortOption: selectedSortOption,
  });

  return result;
}

function sortRecurringBills({
  filteredRecurringBills,
  sortOption,
}: {
  filteredRecurringBills: Array<RecurringBill>;
  sortOption: SortTableOptions;
}) {
  switch (sortOption) {
    case "Latest": {
      return filteredRecurringBills.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }
    case "Oldest": {
      return filteredRecurringBills.sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
    }
    case "A to Z": {
      return filteredRecurringBills.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    case "Z to A": {
      return filteredRecurringBills.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    case "Highest": {
      return filteredRecurringBills.sort((a, b) => {
        return Number(b.amount) - Number(a.amount);
      });
    }
    case "Lowest": {
      return filteredRecurringBills.sort((a, b) => {
        return Number(a.amount) - Number(b.amount);
      });
    }
  }
}

export function getPaginatedRecurringBills({
  currentPage,
  allTransactions,
}: {
  currentPage: number;
  allTransactions: Array<RecurringBill>;
}) {
  const start = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
  const end = currentPage * TRANSACTIONS_PER_PAGE;
  return {
    paginatedTransactions: allTransactions.slice(start, end),
    totalPages: Math.ceil(allTransactions.length / TRANSACTIONS_PER_PAGE),
  };
}
