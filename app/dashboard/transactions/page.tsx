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

import { TransactionsTable } from "@/components/transaction-table/data-table";
import SortByDropdown from "@/components/SortByDropdown";
import TransactionCategoryDropdown from "@/components/transactions/TransactionsCategoryDropdown";
import { getAllTransactions } from "@/services/transactions/getAllTransactions";

export default async function Page() {
  const transactions = await getAllTransactions();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
      <Card className="space-y-6 px-5 py-6 md:p-8">
        <div className="flex items-center gap-6 lg:justify-between">
          <div className="flex-1 lg:flex-none">
            <InputWithIcon
              variant="end"
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
              <TransactionCategoryDropdown
                categories={["Entertainment", "Food", "Rent", "Gas"]}
              />
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
            <TransactionsTable data={transactions} />
          </div>
        </CardContent>
        <CardFooter className="flex h-16 items-end">
          <TransactionPagination />
        </CardFooter>
      </Card>
    </div>
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
