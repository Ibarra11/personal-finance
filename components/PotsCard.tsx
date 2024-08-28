import { Button } from "./ui/button";
import IconCaretRight from "../public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "./ui/card";
import IconPot from "../public/icons/icon-pot.svg";
import Pot from "./Pot";

export default function PotsCard() {
  return (
    <Card className="space-y-5 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between p-0">
        <h3 className="text-xl font-bold">Pots</h3>
        <Button
          variant="link"
          className="items-center gap-3 p-0 text-sm text-gray-500"
        >
          See Details
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-0 md:flex-row">
        <div className="md:w-64">
          <HighlightCard />
        </div>
        <div className="grid grid-cols-2 gap-4 md:flex-1">
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
