import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { SortTableOptions } from "@/types";
import { addDays, addMonths, addWeeks, lastDayOfMonth } from "date-fns";

export const ITEMS_PER_PAGE = 10;

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
  allRecurringBills,
}: {
  currentPage: number;
  allRecurringBills: Array<RecurringBill>;
}) {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = currentPage * ITEMS_PER_PAGE;
  return {
    paginatedRecurringBills: allRecurringBills.slice(start, end),
    totalPages: Math.ceil(allRecurringBills.length / ITEMS_PER_PAGE),
  };
}

export function getPaymentsDueSoon(recurringBills: RecurringBill[]) {
  const now = new Date();

  const dayOfWeek = now.getDay();

  const startOfWeek = new Date(now);
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(now.getDate() - offset);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const getNextDueDate = (bill: RecurringBill) => {
    const billStartDate = new Date(bill.startDate);
    const { frequency } = bill;

    let nextDueDate = billStartDate;

    while (nextDueDate < now) {
      if (frequency === "Daily") {
        nextDueDate = addDays(nextDueDate, 1);
      } else if (frequency === "Weekly") {
        nextDueDate = addWeeks(nextDueDate, 1);
      } else if (frequency === "Monthly") {
        nextDueDate = addMonths(nextDueDate, 1);
      }
    }

    return nextDueDate;
  };

  const billsInPeriod = recurringBills.filter((bill) => {
    const nextDueDate = getNextDueDate(bill);
    return nextDueDate >= startOfWeek && nextDueDate <= endOfWeek;
  });

  return {
    total: billsInPeriod.reduce((acc, curr) => acc + Number(curr.amount), 0),
    count: billsInPeriod.length,
  };
}

export function getUpcomingPaymentsThisMonth(recurringBills: RecurringBill[]) {
  const now = new Date();
  const endOfMonth = lastDayOfMonth(now);

  // Helper function to calculate the next due date based on frequency
  const getNextDueDate = (bill: RecurringBill) => {
    const billStartDate = new Date(bill.startDate);
    const { frequency } = bill;

    let nextDueDate = billStartDate;

    // Move the next due date forward based on frequency
    while (nextDueDate < now) {
      if (frequency === "Daily") {
        nextDueDate = addDays(nextDueDate, 1);
      } else if (frequency === "Weekly") {
        nextDueDate = addWeeks(nextDueDate, 1);
      } else if (frequency === "Monthly") {
        nextDueDate = addMonths(nextDueDate, 1);
      }
    }

    return nextDueDate;
  };

  const unpaidBillsInPeriod = recurringBills.filter((bill) => {
    const nextDueDate = getNextDueDate(bill);

    const isDueThisMonth = nextDueDate >= now && nextDueDate <= endOfMonth;

    return isDueThisMonth;
  });

  return {
    total: unpaidBillsInPeriod.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    ),
    count: unpaidBillsInPeriod.length,
  };
}
