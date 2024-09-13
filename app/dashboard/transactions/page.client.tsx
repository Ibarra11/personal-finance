"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { InputWithIcon } from "@/components/ui/input";
import IconSearch from "@/public/icons/icon-search.svg";
import IconFilterMobile from "@/public/icons/icon-filter-mobile.svg";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";
import { Button } from "@/components/ui/button";
import CompactTransaction from "@/components/CompactTransaction";

import { TransactionsTable } from "@/components/transaction-table/data-table";
import SortByDropdown, { SortTableOptions } from "@/components/SortByDropdown";
import TransactionCategoryDropdown from "@/components/transactions/TransactionsCategoryDropdown";
import type { TransactionWithCategory } from "@/services/transactions/getTransactions";
import React, { ChangeEvent, useMemo, useState } from "react";
import { filterTransactions, getPaginatedTransactions } from "./helpers";
import TransactionPagination from "@/components/transactions/TransactionsPagination";

interface Props {
  transactions: Array<TransactionWithCategory>;
  categories: Array<string>;
}

export default function PageClient({ transactions, categories }: Props) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortTableOptions>("Latest");

  function handleCategoryChange(category: string | null) {
    setPage(1);
    setSelectedCategory(category);
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

  const filteredTransactions = useMemo(
    () =>
      filterTransactions({
        searchTerm,
        selectedCategory,
        selectedSortOption,
        transactions,
      }),
    [selectedCategory, searchTerm, selectedSortOption, transactions],
  );

  const { paginatedTransactions, totalPages } = getPaginatedTransactions({
    currentPage: page,
    allTransactions: filteredTransactions,
  });

  return (
    <Card className="space-y-6 px-5 py-6 md:p-8">
      <div className="flex items-center gap-6 lg:justify-between">
        <div className="flex-1 lg:flex-none">
          <InputWithIcon
            onChange={handleSearchTermChange}
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
            <SortByDropdown
              sortOption={selectedSortOption}
              onSortOptionChange={handleSortOptionChange}
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">Category</p>
            <TransactionCategoryDropdown
              selectedCategory={selectedCategory}
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
      </div>
      <CardContent className="space-y-4">
        <div className="md:hidden">
          {new Array(10).fill(null).map((_, idx) => (
            <div
              key={idx}
              className="border-b border-b-gray-100 py-4 first:pt-0 last:border-none last:pb-0"
            >
              <CompactTransaction />
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <TransactionsTable data={paginatedTransactions} />
        </div>
      </CardContent>
      <CardFooter className="flex h-16 items-end">
        <TransactionPagination
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </CardFooter>
    </Card>
  );
}
