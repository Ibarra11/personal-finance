import { formatNumber } from "@/lib/utils";

export default function PotSummary({
  theme,
  name,
  totalSaved,
}: {
  theme: string;
  name: string;
  totalSaved: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        style={{ backgroundColor: theme }}
        className="w-1 rounded-full"
      ></div>
      <div className="space-y-1">
        <p className="text-xs text-gray-500">{name}</p>
        <p className="text-sm font-bold text-gray-900">
          ${formatNumber(totalSaved)}
        </p>
      </div>
    </div>
  );
}
