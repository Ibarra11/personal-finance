"use client";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CreateOrEditBillFormType } from "../schema";
import { DatePicker } from "@/components/ui/date-picker";

export function BillDateField({ form }: { form: CreateOrEditBillFormType }) {
  function handleDateChange(newDate: Date | undefined) {
    if (newDate) {
      form.setValue("startDate", newDate);
    }
  }

  return (
    <FormField
      control={form.control}
      name="startDate"
      render={({ field }) => (
        <FormItem className="bg-t flex flex-col">
          <FormLabel>Start Date</FormLabel>
          <DatePicker
            date={field.value}
            onDateChange={handleDateChange}
            buttonClassname="hover:bg-transparent hover:border-gray-900 w-full hover:text-gray-900"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
