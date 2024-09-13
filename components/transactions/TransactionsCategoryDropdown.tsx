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
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function TransactionCategoryDropdown({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  return (
    <Select
      value={selectedCategory ?? "all"}
      onValueChange={(value) => {
        if (value === "all") {
          return onCategoryChange(null);
        }
        return onCategoryChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
