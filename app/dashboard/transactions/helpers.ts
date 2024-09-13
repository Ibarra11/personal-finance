import { SortTableOptions } from "@/components/SortByDropdown";
import { TransactionWithCategory } from "@/services/transactions/getTransactions";

export function filterTransactions({
  transactions,
  selectedCategory,
  searchTerm,
  selectedSortOption,
}: {
  transactions: Array<TransactionWithCategory>;
  selectedCategory: string | null;
  searchTerm: string;
  selectedSortOption: SortTableOptions;
}) {
  let filteredTransactions: Array<TransactionWithCategory>;

  if (!selectedCategory && !searchTerm) {
    //   spread transasctions, so when we change sortOption we have new array and Tanstack table will re-render
    filteredTransactions = [...transactions];
  } else {
    filteredTransactions = transactions.filter((transaction) => {
      const matchesCategory = selectedCategory
        ? transaction.category.name === selectedCategory
        : true;

      const matchesSearchTerm = searchTerm
        ? transaction.party.toLowerCase().includes(searchTerm.toLowerCase())
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
  filteredTransactions: Array<TransactionWithCategory>;
  sortOption: SortTableOptions;
}) {
  switch (sortOption) {
    case "Latest": {
      return filteredTransactions.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }
    case "Oldest": {
      return filteredTransactions.sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
    }
    case "A to Z": {
      return filteredTransactions.sort((a, b) => {
        return a.party.localeCompare(b.party);
      });
    }
    case "Z to A": {
      return filteredTransactions.sort((a, b) => {
        return b.party.localeCompare(a.party);
      });
    }
    case "Highest": {
      return filteredTransactions.sort((a, b) => {
        const bAmount =
          b.type === "payment" ? Number(b.amount) * -1 : Number(b.amount);
        const aAmount =
          a.type === "payment" ? Number(a.amount) * -1 : Number(a.amount);
        return bAmount - aAmount;
      });
    }
    case "Lowest": {
      return filteredTransactions.sort((a, b) => {
        const bAmount =
          b.type === "payment" ? Number(b.amount) * -1 : Number(b.amount);
        const aAmount =
          a.type === "payment" ? Number(a.amount) * -1 : Number(a.amount);
        return aAmount - bAmount;
      });
    }
  }
}
