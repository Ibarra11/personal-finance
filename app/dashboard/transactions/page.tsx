import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { InputWithIcon } from "@/components/ui/input";
import IconSearch from "@/public/icons/icon-search.svg";
import IconFilterMobile from "@/public/icons/icon-filter-mobile.svg";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";
import { Button } from "@/components/ui/button";
import CompactTransaction from "@/components/CompactTransaction";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns, Transaction } from "@/components/transaction-table/columns";
import { TransactionsTable } from "@/components/transaction-table/data-table";
import SortByDropdown from "@/components/SortByDropdown";

// Example mock data
const data: Transaction[] = [
  {
    transactionParty: "John Doe",
    category: "Groceries",
    date: "2024-08-30",
    amount: "$150.00",
  },
  {
    transactionParty: "Jane Smith",
    category: "Utilities",
    date: "2024-08-29",
    amount: "$75.50",
  },
  {
    transactionParty: "Acme Corp",
    category: "Salary",
    date: "2024-08-28",
    amount: "$3,000.00",
  },
  {
    transactionParty: "Big Mart",
    category: "Shopping",
    date: "2024-08-27",
    amount: "$220.75",
  },
  {
    transactionParty: "Rent Payment",
    category: "Housing",
    date: "2024-08-26",
    amount: "$1,200.00",
  },
  {
    transactionParty: "Jane Smith",
    category: "Dining",
    date: "2024-08-25",
    amount: "$85.40",
  },
  {
    transactionParty: "John Doe",
    category: "Insurance",
    date: "2024-08-24",
    amount: "$250.00",
  },
  {
    transactionParty: "XYZ Electric",
    category: "Utilities",
    date: "2024-08-23",
    amount: "$95.60",
  },
  {
    transactionParty: "Acme Corp",
    category: "Bonus",
    date: "2024-08-22",
    amount: "$500.00",
  },
  {
    transactionParty: "Medical Center",
    category: "Healthcare",
    date: "2024-08-21",
    amount: "$200.00",
  },
];

async function getData(): Promise<Transaction[]> {
  return data;
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
      <Card className="space-y-6 px-5 py-6 md:p-8">
        <div className="flex items-center gap-6 lg:justify-between">
          <div className="flex-1 lg:flex-none">
            <InputWithIcon
              className="lg:w-80"
              icon={<IconSearch className="size-4" />}
              placeholder="search transaction"
            />
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <IconSortMobile className="size-5 text-gray-900" />
            </Button>
            <Button variant="ghost" size="icon">
              <IconFilterMobile className="size-5 text-gray-900" />
            </Button>
          </div>
          <div className="hidden md:flex md:gap-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">Sort By</p>
              <SortByDropdown />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">Category</p>
              <TransactionCategoryDropdown />
            </div>
          </div>
        </div>
        <CardContent className="space-y-4">
          <div className="md:hidden">
            {new Array(10).fill(null).map(() => (
              <div className="border-b border-b-gray-100 py-4 first:pt-0 last:border-none last:pb-0">
                <CompactTransaction />
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <TransactionsTable data={data} columns={columns} />
          </div>
        </CardContent>
        <CardFooter className="flex h-16 items-end">
          <TransactionPagination />
        </CardFooter>
      </Card>
    </div>
  );
}

function TransactionCategoryDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}

function TransactionPagination() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="md:mr-auto">
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationButton isActive>1</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>2</PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton>3</PaginationButton>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationButton>5</PaginationButton>
        </PaginationItem>
        <PaginationItem className="md:ml-auto">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
