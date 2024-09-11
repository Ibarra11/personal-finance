import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import IconEllipsis from "@/public/icons/icon-ellipsis.svg";
import PotsProgressBar from "./PotsProgressBar";
import PotActions from "./PotActions";
import WithDrawPotDialog from "./WithdrawPotDialog";
import DepositPotDialog from "./DepositPotDialog";

interface Props {
  pot: string;
  totalSaved: number;
  target: number;
}

export default function PotsCard({ pot, totalSaved, target }: Props) {
  const progress = (totalSaved / target) * 100;
  return (
    <Card className="space-y-8">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-4 rounded-full bg-green"></div>
          <h4 className="text-xl font-bold">{pot}</h4>
        </div>
        <PotActions />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Total Saved</p>
          <p className="text-2xl font-bold text-gray-900">${totalSaved}</p>
        </div>
        <div className="space-y-3">
          <PotsProgressBar type="default" progress={progress} />
          <div className="flex justify-between text-xs text-gray-500">
            <p className="font-bold">{progress}%</p>
            <p>Target of ${target}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <div className="flex-1">
          <DepositPotDialog />
        </div>
        <div className="flex-1">
          <WithDrawPotDialog />
        </div>
      </CardFooter>
    </Card>
  );
}
