"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";
import { useState } from "react";
import { SortTableOptions } from "@/types";
import { SORT_BY_OPTIONS } from "@/lib/constants";
import clsx from "clsx";

interface Props {
  sortOption: SortTableOptions;
  onSortOptionChange: (sortOption: SortTableOptions) => void;
}

export default function SortOptionsPopover({
  sortOption,
  onSortOptionChange,
}: Props) {
  const [open, setIsOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={"sort options popover"}>
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
            key={option}
            onClick={() => {
              setIsOpen(false);
              onSortOptionChange(option);
            }}
            className={clsx(
              "h-10 w-full justify-start hover:bg-accent focus-visible:bg-accent",
              sortOption === option
                ? "font-bold text-gray-900"
                : "text-gray-500",
            )}
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
