import { Button } from "@/components/ui/button";
import IconCaretRight from "@/public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "../ui/card";
import IconPot from "@/public/icons/icon-pot.svg";
import { getAllPots } from "@/services/pots/getAllPots";
import { formatNumber } from "@/lib/utils";

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
      <CardContent className="flex flex-col gap-5 p-0 md:flex-row">
        <div className="md:w-64">
          <HighlightCard totalSaved={totalSaved} />
        </div>
        <div className="grid grid-cols-2 gap-4 md:flex-1">
          {pots.map((pot) => (
            <Pot
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

function Pot({
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
