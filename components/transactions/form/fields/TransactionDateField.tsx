"use client";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DatePicker } from "@/components/ui/date-picker";
import { TransactionFormType } from "../schema";

export function TransactionDateField({ form }: { form: TransactionFormType }) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="bg-t flex flex-col">
          <FormLabel>Date</FormLabel>
          <DatePicker
            date={field.value}
            onDateChange={field.onChange}
            buttonClassname="hover:bg-transparent hover:border-gray-900 w-full hover:text-gray-900"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
