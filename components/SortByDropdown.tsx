import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_BY_OPTIONS } from "@/lib/constants";

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
