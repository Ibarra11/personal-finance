import { Button } from "@/components/ui/button";
import IconCaretRight from "@/public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconPot from "@/public/icons/icon-pot.svg";
import { getAllPots } from "@/services/pots/getAllPots";
import { formatNumber } from "@/lib/utils";
import PotSummary from "../PotSummary";

export default async function PotsCard() {
  const pots = await getAllPots();
  const totalSaved = pots.reduce(
    (acc, curr) => acc + Number(curr.totalSaved),
    0,
  );
  return (
    <Card className="space-y-5 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between p-0">
        <h3 className="text-xl font-bold">Pots</h3>
        <Button variant="link" size="sm" className="items-center gap-3">
          See Details
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-0 md:flex-row md:items-start">
        <div className="md:w-64">
          <HighlightCard totalSaved={totalSaved} />
        </div>
        <div className="grid grid-cols-2 gap-4 md:flex-1">
          {pots.map((pot) => (
            <PotSummary
              key={pot.id}
              theme={pot.theme.color}
              name={pot.name}
              totalSaved={pot.totalSaved}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function HighlightCard({ totalSaved }: { totalSaved: number }) {
  return (
    <Card className="flex items-center gap-4 bg-background p-4">
      <IconPot className="size-10 shrink-0 text-green" />
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Total Saved</p>
        <p className="text-xl font-bold text-gray-900">
          ${formatNumber(totalSaved)}
        </p>
      </div>
    </Card>
  );
}
