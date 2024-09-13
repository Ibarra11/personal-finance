"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";
import { SORT_BY_OPTIONS, SortTableOptions } from "../SortByDropdown";
import { useState } from "react";

interface Props {
  sortOption: SortTableOptions;
  onSortOptionChange: (sortOption: SortTableOptions) => void;
}

export default function TransactionSortPopover({
  sortOption,
  onSortOptionChange,
}: Props) {
  const [open, setIsOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open sorting options for transactions"
        >
          <IconSortMobile className="size-5 text-gray-900" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        side="bottom"
        className="flex w-28 flex-col p-1"
      >
        {SORT_BY_OPTIONS.map((option) => (
          <Button
            onClick={() => {
              setIsOpen(false);
              onSortOptionChange(option);
            }}
            className={`h-10 w-full justify-start text-gray-900 hover:bg-accent hover:text-gray-900 focus-visible:bg-accent ${sortOption === option ? "font-bold text-gray-900" : "text-gray-500"}`}
            size="sm"
            variant="ghost"
          >
            {option}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
