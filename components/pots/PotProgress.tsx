import PotsProgressBar from "./PotsProgressBar";

export type PotProgressProps =
  | {
      type: "withdraw" | "deposit";
      totalSaved: number;
      target: number;
      progress: number;
      progressAfterAction: number;
    }
  | { type: "default"; progress: number; totalSaved: number; target: number };

const config: Record<PotProgressProps["type"], string> = {
  default: "text-gray-500",
  withdraw: "text-red",
  deposit: "text-green",
};

export default function PotProgress({
  totalSaved,
  target,
  type,
  ...props
}: PotProgressProps) {
  const progress = (totalSaved / target) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">New Amount</p>
        <p className="text-2xl font-bold text-gray-900">${totalSaved}</p>
      </div>
      <div className="space-y-3">
        <PotsProgressBar value={progress} />
        <div className="flex justify-between text-xs text-gray-500">
          <p className={`font-bold ${config[type]}`}>{progress}%</p>
          <p>Target of ${target}</p>
        </div>
      </div>
    </div>
  );
}
