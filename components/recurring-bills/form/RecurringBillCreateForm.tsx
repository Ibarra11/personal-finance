"use client";
import { z } from "zod";
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
import { BillFrequencyField } from "./fields/BillFrequencyField";

interface Props {
  isDisabled: boolean;
  onRecurringBillCreate: (values: CreateOrEditBillFormSchemaType) => void;
}

export default function RecurringBillCreateForm({
  onRecurringBillCreate,
  isDisabled,
}: Props) {
  const form = useForm<CreateOrEditBillFormSchemaType>({
    resolver: zodResolver(createOrEditBillFormSchema),
    defaultValues: {
      amount: "0.00",
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRecurringBillCreate)}>
        <fieldset disabled={isDisabled} className="space-y-4">
          <BillNameField form={form} />
          <BillAmountField form={form} />
          <BillBudgetField isDisabled={isDisabled} form={form} />
          <BillDateField form={form} />
          <BillFrequencyField form={form} />
          <SubmitButton text="Save Changes" />
        </fieldset>
      </form>
    </Form>
  );
}
