import { formatNumber } from "@/lib/utils";

interface Props {
  categoryName: string;
  theme: string;
  totalSpent: number;
  maxSpend: string;
}
export default function CompactBudgetCategory({
  categoryName,
  theme,
  totalSpent,
  maxSpend,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex gap-4">
        <div style={{ background: theme }} className="w-1 rounded-full"></div>
        <p className="text-sm text-gray-500">{categoryName}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold">${formatNumber(totalSpent)}</p>
        <p className="text-xs text-gray-500">of {formatNumber(maxSpend)}</p>
      </div>
    </div>
  );
}
