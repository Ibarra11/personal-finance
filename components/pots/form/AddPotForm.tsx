"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PotNameField from "./fields/PotNameField";
import PotTargetField from "./fields/PotTargetField";
import { AddOrEditFormSchemaType, addOrEditFormSchema } from "./schema";

import AddPotThemeField from "./fields/AddPotThemeField";
import { Loader } from "lucide-react";
import SubmitButton from "../../SubmitButton";

interface Props {
  isDisabled: boolean;
  onPotAdd: (values: AddOrEditFormSchemaType) => void;
}

export default function AddPotForm({ isDisabled, onPotAdd }: Props) {
  const form = useForm<AddOrEditFormSchemaType>({
    resolver: zodResolver(addOrEditFormSchema),
    defaultValues: {
      potName: "",
      target: "0.00",
    },
  });

  function onSubmit(values: AddOrEditFormSchemaType) {
    onPotAdd(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-4" disabled={isDisabled}>
          <PotNameField form={form} />
          <PotTargetField form={form} />
          <AddPotThemeField form={form} />
          <SubmitButton text="Add Pot" />
        </fieldset>
      </form>
    </Form>
  );
}
