import { SortTableOptions } from "@/components/SortByDropdown";
import { TransactionWithBudgetCategories } from "@/services/transactions/getAllTransactions";

export const TRANSACTIONS_PER_PAGE = 10;

export function filterTransactions({
  transactions,
  selectedCategory,
  searchTerm,
  selectedSortOption,
}: {
  transactions: Array<TransactionWithBudgetCategories>;
  selectedCategory: string | null;
  searchTerm: string;
  selectedSortOption: SortTableOptions;
}) {
  let filteredTransactions: Array<TransactionWithBudgetCategories>;

  if (!selectedCategory && !searchTerm) {
    //   spread transasctions, so when we change sortOption we have new array and Tanstack table will re-render
    filteredTransactions = [...transactions];
  } else {
    filteredTransactions = transactions.filter((transaction) => {
      const matchesCategory = selectedCategory
        ? transaction.category === selectedCategory
        : true;

      const matchesSearchTerm = searchTerm
        ? transaction.transaction
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearchTerm;
    });
  }

  const result = sortTransactions({
    filteredTransactions,
    sortOption: selectedSortOption,
  });

  return result;
}

function sortTransactions({
  filteredTransactions,
  sortOption,
}: {
  filteredTransactions: Array<TransactionWithBudgetCategories>;
  sortOption: SortTableOptions;
}) {
  switch (sortOption) {
    case "Latest": {
      return filteredTransactions.sort((a, b) => {
        return b.transactionDate.getTime() - a.transactionDate.getTime();
      });
    }
    case "Oldest": {
      return filteredTransactions.sort((a, b) => {
        return a.transactionDate.getTime() - b.transactionDate.getTime();
      });
    }
    case "A to Z": {
      return filteredTransactions.sort((a, b) => {
        return a.transaction.localeCompare(b.transaction);
      });
    }
    case "Z to A": {
      return filteredTransactions.sort((a, b) => {
        return b.transaction.localeCompare(a.transaction);
      });
    }
    case "Highest": {
      return filteredTransactions.sort((a, b) => {
        return Number(b.amount) - Number(a.amount);
      });
    }
    case "Lowest": {
      return filteredTransactions.sort((a, b) => {
        return Number(a.amount) - Number(b.amount);
      });
    }
  }
}

export function getPaginatedTransactions({
  currentPage,
  allTransactions,
}: {
  currentPage: number;
  allTransactions: Array<TransactionWithBudgetCategories>;
}) {
  const start = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
  const end = currentPage * TRANSACTIONS_PER_PAGE;
  return {
    paginatedTransactions: allTransactions.slice(start, end),
    totalPages: Math.ceil(allTransactions.length / TRANSACTIONS_PER_PAGE),
  };
}
