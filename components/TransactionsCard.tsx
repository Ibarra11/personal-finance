import { Button } from "./ui/button";
import IconCaretRight from "../public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function TransactionsCard() {
  return (
    <Card className="space-y-8 p-8">
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
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </CardContent>
    </Card>
  );
}

function Transaction() {
  return (
    <div className="flex border-b border-b-gray-100 pb-5 last:border-none last:pb-0">
      <div className="flex flex-1 items-center gap-4">
        <div className="size-10 rounded-full bg-gray-300"></div>
        <p className="text-sm font-bold text-gray-900">John Doe</p>
      </div>
      <div className="space-y-2">
        <p className="text-green text-sm font-bold">75.50</p>
        <p className="text-xs text-gray-500">19 Aug 2024</p>
      </div>
    </div>
  );
}
