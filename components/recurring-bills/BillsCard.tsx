import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input";
import IconSearch from "@/public/icons/icon-search.svg";
import IconSortMobile from "@/public/icons/icon-sort-mobile.svg";
import IconBillPaid from "@/public/icons/icon-bill-paid.svg";

export function BillsCard() {
  return (
    <div>
      <Bill />
      <Bill />
      <Bill />
      <Bill />
      <Bill />
      <Bill />
      <Bill />
    </div>
  );
}

function Bill() {
  return (
    <div className="space-y-2 border-b border-gray-100 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <h5 className="text-sm font-bold text-gray-900">Elevate Education</h5>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <p className="text-xs text-green">Monthly - 1st</p>
          <IconBillPaid className="size-4 text-green" />
        </div>
        <p className="text-sm font-bold text-gray-900">$250.00</p>
      </div>
    </div>
  );
}
