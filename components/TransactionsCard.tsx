import { Button } from "./ui/button";
import IconCaretRight from "../public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "./ui/card";
import CompactTransaction from "./CompactTransaction";

export default function TransactionsCard() {
  return (
    <Card className="space-y-8 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between p-0">
        <h3 className="text-xl font-bold">Transactions</h3>
        <Button
          variant="link"
          className="items-center gap-3 p-0 text-sm text-gray-500"
        >
          View All
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-5 p-0">
        <CompactTransaction />
        <CompactTransaction />
        <CompactTransaction />
        <CompactTransaction />
        <CompactTransaction />
      </CardContent>
    </Card>
  );
}
