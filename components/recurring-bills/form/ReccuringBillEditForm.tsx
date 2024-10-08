"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/SubmitButton";
import {
  createOrEditBillFormSchema,
  CreateOrEditBillFormSchemaType,
} from "./schema";
import BillNameField from "./fields/BillNameField";
import BillBudgetField from "./fields/BillBudgetField";
import BillAmountField from "./fields/BillAmountField";
import { BillDateField } from "./fields/BillDateField";
import { RecurringBill } from "@/services/recurring-bills/getAllBills";
import { parseISO } from "date-fns";
import { BillFrequencyField } from "./fields/BillFrequencyField";

interface Props {
  isDisabled: boolean;
  onRecurringBillEdit: (values: CreateOrEditBillFormSchemaType) => void;
  recurringBill: RecurringBill;
}

export default function RecurringBillEditForm({
  onRecurringBillEdit,
  isDisabled,
  recurringBill,
}: Props) {
  const form = useForm<CreateOrEditBillFormSchemaType>({
    resolver: zodResolver(createOrEditBillFormSchema),
    defaultValues: {
      amount: recurringBill.amount,
      name: recurringBill.name,
      budgetId: recurringBill.budgetId,
      startDate: parseISO(recurringBill.startDate),
      frequency: recurringBill.frequency,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRecurringBillEdit)}>
        <fieldset disabled={isDisabled} className="space-y-4">
          <BillNameField form={form} />
          <BillAmountField form={form} />
          <BillBudgetField
            currentBudgetId={recurringBill.budgetId}
            form={form}
            isDisabled={isDisabled}
          />
          <BillDateField form={form} />
          <BillFrequencyField form={form} />
          <SubmitButton text="Save Changes" />
        </fieldset>
      </form>
    </Form>
  );
}
