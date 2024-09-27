import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <Pagination>
      <PaginationContent className="gap-2">
        <PaginationItem className="md:mr-auto">
          <PaginationPrevious
            className="h-10 py-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        <div className="hidden md:flex md:gap-2">
          <DesktopTabletPaginationContent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        <div className="md:hidden">
          <MobilePaginationContent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        <PaginationItem className="md:ml-auto">
          <PaginationNext
            className="h-10 py-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function DesktopTabletPaginationContent({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  return pageNumbers.map((page) => (
    <PaginationItem key={page}>
      <PaginationButton
        onClick={() => onPageChange(page)}
        isActive={page === currentPage}
      >
        {page}
      </PaginationButton>
    </PaginationItem>
  ));
}

function MobilePaginationContent({ currentPage, totalPages }: Props) {
  return (
    <p className="text-sm text-gray-500">
      Page {currentPage} of {totalPages}
    </p>
  );
}
