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

interface Props {
  isDisabled: boolean;
  onTransactionCreate: (values: TransactionFormSchemaType) => void;
}

export default function TransactionsCreateForm({
  onTransactionCreate,
  isDisabled,
}: Props) {
  const form = useForm<TransactionFormSchemaType>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: "0.00",
      transaction: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onTransactionCreate)}>
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
