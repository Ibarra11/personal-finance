import { Button } from "./ui/button";
import IconCaretRight from "../public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "./ui/card";
import IconPot from "../public/icons/icon-pot.svg";
import Pot from "./Pot";

export default function PotsCard() {
  return (
    <Card className="space-y-5">
      <CardHeader className="flex-row items-center justify-between p-8 pb-0">
        <h3 className="text-xl font-bold">Pots</h3>
        <Button
          variant="link"
          className="items-center gap-3 p-0 text-sm text-gray-500"
        >
          See Details
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="flex gap-5 p-8 pt-0">
        <div className="flex-1">
          <HighlightCard />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4">
          <Pot />
          <Pot />
          <Pot />
          <Pot />
        </div>
      </CardContent>
    </Card>
  );
}

function HighlightCard() {
  return (
    <Card className="flex items-center gap-4 bg-background p-4">
      <IconPot className="text-green size-10" />
      <div className="space-y-3">
        <p className="text-sm text-gray-500">Total Saved</p>
        <p className="text-3xl font-bold text-gray-900">$850</p>
      </div>
    </Card>
  );
}
