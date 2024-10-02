"use client";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CreateOrEditBillFormType } from "../schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PAYMENT_FREQUENCY_ENUM } from "@/db/schema";

export function BillFrequencyField({
  form,
}: {
  form: CreateOrEditBillFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="frequency"
      render={({ field }) => (
        <FormItem className="bg-t flex flex-col">
          <FormLabel>Frequency</FormLabel>
          <RadioGroup
            className="flex justify-between"
            defaultValue={field.value || PAYMENT_FREQUENCY_ENUM[0]}
            onChange={field.onChange}
          >
            {PAYMENT_FREQUENCY_ENUM.map((frequency) => (
              <div key={frequency} className="flex items-center space-x-2">
                <RadioGroupItem value={frequency} id={frequency} />
                <Label htmlFor={frequency}>{frequency}</Label>
              </div>
            ))}
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
