import IconBillPaid from "@/public/icons/icon-bill-paid.svg";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { formatNumber, getDayWithSuffix } from "@/lib/utils";

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

function RecurringBillCard({ name, dueDate, amount }: RecurringBill) {
  return (
    <div className="flex items-center justify-between space-y-2 border-b border-gray-100 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex flex-col gap-2">
        <h5 className="text-sm font-bold text-gray-900">{name}</h5>
        <div className="flex gap-2">
          <p className="text-xs text-green">
            Monthly - {getDayWithSuffix(dueDate)}
          </p>
          <IconBillPaid className="size-4 text-green" />
        </div>
      </div>
      <p className="text-sm font-bold text-gray-900">${formatNumber(amount)}</p>
    </div>
  );
}
