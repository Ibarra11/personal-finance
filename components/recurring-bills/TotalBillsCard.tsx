import { Card } from "@/components/ui/card";
import IconReccuringBills from "@/public/icons/icon-nav-recurring-bills.svg";
export default function TotalBillsCard() {
  return (
    <Card className="flex items-center gap-5 bg-gray-900 px-5 py-6 text-white md:flex-1 md:flex-col md:items-start md:justify-between">
      <IconReccuringBills className="size-10" />
      <div className="space-y-3">
        <p className="text-sm">Total Bills</p>
        <p className="text-3xl font-bold">$300.85</p>
      </div>
    </Card>
  );
}
