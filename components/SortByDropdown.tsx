import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SORT_BY_OPTIONS = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
] as const;
export type SortTableOptions = (typeof SORT_BY_OPTIONS)[number];
interface Props {
  sortOption: SortTableOptions;
  onSortOptionChange: (sortOption: SortTableOptions) => void;
}

export default function SortByDropdown({
  sortOption,
  onSortOptionChange,
}: Props) {
  return (
    <Select value={sortOption} onValueChange={onSortOptionChange}>
      <SelectTrigger className="w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_BY_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
