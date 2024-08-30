import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function Page() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
      <Card className="space-y-6 px-5 py-6">
        <div className="flex items-center gap-6">
          <Label className="relative">
            <Input
              className="border-beige-500 placeholder-beige-500border bg-white pr-8 text-gray-900"
              placeholder="search transaction"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <IconSearch className="size-4 text-gray-900" />
            </span>
          </Label>
          <Button variant="ghost" size="icon">
            <IconSortMobile className="size-5 text-gray-900" />
          </Button>
          <Button variant="ghost" size="icon">
            <IconFilterMobile className="size-5 text-gray-900" />
          </Button>
        </div>
        <CardContent className="space-y-4">
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
          <CompactTransaction />
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
          <PaginationEllipsis />
        </PaginationItem>
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
