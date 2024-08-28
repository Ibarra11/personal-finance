import { Button } from "./ui/button";
import IconCaretRight from "../public/icons/icon-caret-right.svg";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function RecurringBillsCard() {
  return (
    <Card className="space-y-8 p-8">
      <CardHeader className="flex-row items-center justify-between p-0">
        <h3 className="text-xl font-bold">Recurring Bills</h3>
        <Button
          variant="link"
          className="items-center gap-3 py-0 text-sm text-gray-500"
        >
          View Details
          <IconCaretRight className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 p-0">
        <Bill />
        <Bill />
        <Bill />
      </CardContent>
    </Card>
  );
}

function Bill() {
  return (
    <div className="border-l-green flex justify-between rounded-md border-l-4 bg-background px-4 py-5 text-sm">
      <p className="text-gray-500">Paid Bills</p>
      <p className="font-bold text-gray-900">$190</p>
    </div>
  );
}
