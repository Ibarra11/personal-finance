import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { AddOrEditFormType } from "../schema";

export default function PotNameField({ form }: { form: AddOrEditFormType }) {
  return (
    <FormField
      control={form.control}
      name="potName"
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <FormLabel>Pot Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter a name for your pot" {...field} />
          </FormControl>
          {!fieldState.error && (
            <p className="absolute -bottom-2 right-0 translate-y-full text-right text-xs text-gray-500">
              {30 - field.value.length} of 30 characters left
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
