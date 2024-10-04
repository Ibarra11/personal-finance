import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import TransactionsEditForm from "./form/TransactionsEditForm";
import { TransactionWithBudgetCategories } from "@/services/transactions/getAllTransactions";
import TransactionsEditDialog from "./TransactionsEditDialog";
import TransactionsDeleteDialog from "./TransactionsDeleteDialog";

interface Props {
  isOpen: boolean;
  onOpenChange: (newState: boolean) => void;
  transaction: TransactionWithBudgetCategories;
}

export default function TransactionsActions({
  isOpen,
  onOpenChange,
  transaction,
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
        <TransactionsEditDialog
          transaction={transaction}
          onEditComplete={() => onOpenChange(false)}
        />
        <TransactionsDeleteDialog
          onDeleteComplete={() => onOpenChange(false)}
          transaction={transaction.transaction}
          transactionId={transaction.id}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
