import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputWithIcon } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { TransactionFormType } from "../schema";

export default function TransactionAmountField({
  form,
}: {
  form: TransactionFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <InputWithIcon
              variant="start"
              type="number"
              icon={<DollarSign size={14} className="text-beige-500" />}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
