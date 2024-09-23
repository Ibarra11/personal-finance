"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BudgetCategoryField from "./fields/BudgetCategoryField";
import MaximumSpendField from "./fields/MaximumSpendField";
import ThemeField from "./fields/ThemeField";
import { BudgetActions } from "@/app/dashboard/budgets/types";
import { addOrEditFormSchema, AddOrEditFormSchemaType } from "./schema";
import SubmitButton from "@/components/SubmitButton";

interface Props extends BudgetActions {
  isDisabled: boolean;
  onBudgetEdit: (values: AddOrEditFormSchemaType) => void;
}

export default function EditBudgetForm({
  maxSpend,
  theme,
  category,
  isDisabled,
  onBudgetEdit,
}: Props) {
  const form = useForm<z.infer<typeof addOrEditFormSchema>>({
    resolver: zodResolver(addOrEditFormSchema),
    defaultValues: {
      budgetCategory: category,
      maxSpend,
      theme,
    },
  });

  function onSubmit(values: z.infer<typeof addOrEditFormSchema>) {
    onBudgetEdit(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4" disabled={isDisabled}>
          <BudgetCategoryField currentCategory={category} form={form} />
          <MaximumSpendField form={form} />
          <ThemeField form={form} currentTheme={theme} />
          <SubmitButton text="Save Changes" />
        </fieldset>
      </form>
    </Form>
  );
}
