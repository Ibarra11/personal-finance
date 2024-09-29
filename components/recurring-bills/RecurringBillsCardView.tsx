import IconBillPaid from "@/public/icons/icon-bill-paid.svg";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { formatNumber, getDayWithSuffix } from "@/lib/utils";
import RecurringBillsActions from "./RecurringBIllsActions";
import { useState } from "react";

interface Props {
  recurringBills: RecurringBill[];
}

export function RecurringBillsCardView({ recurringBills }: Props) {
  return (
    <>
      {recurringBills.map((recurringBill) => (
        <RecurringBillCard key={recurringBill.id} {...recurringBill} />
      ))}
    </>
  );
}

function RecurringBillCard(recurringBill: RecurringBill) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex flex-col justify-between gap-2">
        <h5 className="text-sm font-bold text-gray-900">
          {recurringBill.name}
        </h5>
        <div className="flex gap-2">
          <p className="text-xs text-green">
            Monthly - {getDayWithSuffix(recurringBill.dueDate)}
          </p>
          <IconBillPaid className="size-4 text-green" />
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2">
        <RecurringBillsActions
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          recurringBill={recurringBill}
        />
        <p className="text-sm font-bold text-gray-900">
          ${formatNumber(recurringBill.amount)}
        </p>
      </div>
    </div>
  );
}
