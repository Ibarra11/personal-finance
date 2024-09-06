import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Categories {
  categories: Array<string>;
}

export default function TransactionCategoryDropdown({
  categories,
}: Categories) {
  return (
    <Select>
      <SelectTrigger defaultValue="all" className="w-[180px]">
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
