"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MaximumSpendField from "./fields/MaximumSpendField";

import { addOrEditFormSchema, AddOrEditFormSchemaType } from "./schema";
import AddBudgetThemeField from "./fields/AddBugetThemeField";
import AddBudgetCategoryField from "./fields/AddBudgetCategoryField";
import { BudgetActions } from "@/app/dashboard/budgets/types";
import SubmitButton from "@/components/SubmitButton";

interface Props {
  isDisabled: boolean;
  onBudgetAdd: (values: AddOrEditFormSchemaType) => void;
}

export default function AddBudgetForm({ isDisabled, onBudgetAdd }: Props) {
  const form = useForm<AddOrEditFormSchemaType>({
    resolver: zodResolver(addOrEditFormSchema),
    defaultValues: {
      maxSpend: "0.00",
    },
  });

  function onSubmit(values: z.infer<typeof addOrEditFormSchema>) {
    onBudgetAdd(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isDisabled} className="space-y-4">
          <AddBudgetCategoryField form={form} />
          <MaximumSpendField form={form} />
          <AddBudgetThemeField form={form} />
          <SubmitButton text="Save Changes" />
        </fieldset>
      </form>
    </Form>
  );
}
