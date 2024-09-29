import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import RecurringBillsEditDialog from "./RecurringBillsEditDialog";
import RecurringBillsDeleteDialog from "./RecurringBillsDeleteDialog";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";

interface Props {
  isOpen: boolean;
  onOpenChange: (newState: boolean) => void;
  recurringBill: RecurringBill;
}

export default function RecurringBillsActions({
  isOpen,
  onOpenChange,
  recurringBill,
}: Props) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`h-8 w-8 p-0`}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <RecurringBillsEditDialog
          onEditComplete={() => onOpenChange(false)}
          recurringBill={recurringBill}
        />
        <RecurringBillsDeleteDialog
          onDeleteComplete={() => onOpenChange(false)}
          recurringBillId={recurringBill.id}
          name={recurringBill.name}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
