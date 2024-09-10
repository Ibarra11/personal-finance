"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BudgetCategoryField from "./fields/BudgetCategoryField";
import MaximumSpendField from "./fields/MaximumSpendField";
import ThemeField from "./fields/ThemeField";

const formSchema = z.object({
  budgetCategory: z.string(),
  maximumSpend: z.number(),
  theme: z.string(),
});

export type EditBudgetFormType = UseFormReturn<z.infer<typeof formSchema>>;

export default function EditBudgetForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BudgetCategoryField form={form} />
        <MaximumSpendField form={form} />
        <ThemeField form={form} />
        <Button className="w-full" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
