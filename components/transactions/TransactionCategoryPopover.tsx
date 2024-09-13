"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconFilterMobile from "@/public/icons/icon-filter-mobile.svg";

import { useState } from "react";

interface Props {
  categories: Array<string>;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function TransactionCategoryPopover({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [open, setIsOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open category options for transactions"
        >
          <IconFilterMobile className="size-5 text-gray-900" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        alignOffset={-20}
        className="flex w-44 flex-col p-1"
      >
        <Button
          onClick={() => {
            setIsOpen(false);
            onCategoryChange(null);
          }}
          className={`h-10 w-full justify-start text-gray-900 hover:bg-accent hover:text-gray-900 focus-visible:bg-accent ${selectedCategory === null ? "font-bold text-gray-900" : "text-gray-500"}`}
          size="sm"
          variant="ghost"
        >
          All Transactions
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => {
              setIsOpen(false);
              onCategoryChange(category);
            }}
            className={`h-10 w-full justify-start text-gray-900 hover:bg-accent hover:text-gray-900 focus-visible:bg-accent ${selectedCategory === category ? "font-bold text-gray-900" : "text-gray-500"}`}
            size="sm"
            variant="ghost"
          >
            {category}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
