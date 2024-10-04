"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/SubmitButton";
import { transactionFormSchema, TransactionFormSchemaType } from "./schema";
import TransactionNameField from "./fields/TransactionNameField";
import TransactionBudgetField from "./fields/TransactionBudgetField";
import { TransactionDateField } from "./fields/TransactionDateField";
import TransactionAmountField from "./fields/TransactionAmountField";
import { TransactionWithBudgetCategories } from "@/services/transactions/getAllTransactions";

interface Props {
  isDisabled: boolean;
  onTransactionEdit: (values: TransactionFormSchemaType) => void;
  transaction: TransactionWithBudgetCategories;
}

export default function TransactionsEditForm({
  onTransactionEdit,
  isDisabled,
  transaction,
}: Props) {
  const form = useForm<TransactionFormSchemaType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: transaction.amount,
      budgetId: transaction.budgetId,
      transactionDate: transaction.transactionDate,
      transaction: transaction.transaction,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onTransactionEdit)}>
        <fieldset disabled={isDisabled} className="space-y-4">
          <TransactionNameField form={form} />
          <TransactionBudgetField isDisabled={isDisabled} form={form} />
          <TransactionDateField form={form} />
          <TransactionAmountField form={form} />
          <SubmitButton text="Save Changes" />
        </fieldset>
      </form>
    </Form>
  );
}
