import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { TransactionFormType } from "../schema";

export default function TransactionNameField({
  form,
}: {
  form: TransactionFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="transaction"
      render={({ field, fieldState }) => (
        <FormItem className="relative">
          <FormLabel>Transaction</FormLabel>
          <FormControl>
            <Input placeholder="Enter a name for this transaction" {...field} />
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
