"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PotNameField from "./fields/PotNameField";
import PotTargetField from "./fields/PotTargetField";
import ThemeField from "./fields/ThemeField";
import { AddOrEditFormSchemaType, addOrEditFormSchema } from "./schema";

export default function AddPotForm() {
  const form = useForm<AddOrEditFormSchemaType>({
    resolver: zodResolver(addOrEditFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: AddOrEditFormSchemaType) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PotNameField form={form} />
        <PotTargetField form={form} />
        <ThemeField currentTheme={{} as any} form={form} />
        <Button className="w-full" type="submit">
          Add Pot
        </Button>
      </form>
    </Form>
  );
}
