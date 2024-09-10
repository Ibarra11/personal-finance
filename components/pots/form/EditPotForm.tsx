"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PotNameField from "./fields/PotNameField";
import PotTargetField from "./fields/PotTargetField";
import ThemeField from "./fields/ThemeField";

const formSchema = z.object({
  potName: z.string(),
  target: z.number(),
  theme: z.string(),
});

export default function EditPotForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PotNameField form={form} />
        <PotTargetField form={form} />
        <ThemeField form={form} />
        <Button className="w-full" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
