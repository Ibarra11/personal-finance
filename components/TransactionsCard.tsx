import { Button } from "./ui/button";
import IconCaretRight from "../public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "./ui/card";
import CompactTransaction from "./CompactTransaction";

export default function TransactionsCard() {
  return (
    <Card className="space-y-8 px-5 py-6 md:p-8">
      <CardHeader className="flex-row items-center justify-between p-0">
        <h3 className="text-xl font-bold">Transactions</h3>
        <Button variant="link" size="sm" className="items-center gap-3">
          View All
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent>
        {new Array(5).fill(null).map(() => (
          <div className="border-b border-b-gray-100 py-5 first:pt-0 last:border-none last:pb-0">
            <CompactTransaction />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
