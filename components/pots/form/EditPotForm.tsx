"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PotNameField from "./fields/PotNameField";
import PotTargetField from "./fields/PotTargetField";
import ThemeField from "./fields/ThemeField";
import { Pot } from "@/types";
import { AddOrEditFormSchemaType, addOrEditFormSchema } from "./schema";
import { Loader } from "lucide-react";
import SubmitButton from "../../SubmitButton";

type Props = Pick<Pot, "name" | "target" | "theme"> & {
  isDisabled: boolean;
  onPotEdit: (values: AddOrEditFormSchemaType) => void;
};

export default function EditPotForm({
  name,
  target,
  theme,
  isDisabled,
  onPotEdit,
}: Props) {
  const form = useForm<AddOrEditFormSchemaType>({
    resolver: zodResolver(addOrEditFormSchema),
    defaultValues: {
      potName: name,
      target,
      theme,
    },
  });

  function onSubmit({ potName, target, theme }: AddOrEditFormSchemaType) {
    onPotEdit({ potName, target, theme });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4" disabled={isDisabled}>
          <PotNameField form={form} />
          <PotTargetField form={form} />
          <ThemeField currentTheme={theme} form={form} />
          <SubmitButton text="Save Changes" />
        </fieldset>
      </form>
    </Form>
  );
}
