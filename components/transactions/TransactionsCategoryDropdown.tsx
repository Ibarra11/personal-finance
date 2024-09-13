"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: Array<string>;
  selectedCategory: null | string;
  onCategoryChange: (category: string) => void;
}

export default function TransactionCategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  return (
    <Select value={selectedCategory ?? "all"} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem value={category}>{category}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
