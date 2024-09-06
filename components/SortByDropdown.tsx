import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPTIONS = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];

export default function SortByDropdown() {
  return (
    <Select defaultValue={OPTIONS[0]}>
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
