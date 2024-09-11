import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputWithIcon } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { DepositPotFormType } from "../DepositPotForm";

export default function DepositPotField({
  form,
}: {
  form: DepositPotFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="depositAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount to Add</FormLabel>
          <FormControl>
            <InputWithIcon
              variant="start"
              type="number"
              icon={<DollarSign size={14} className="text-beige-500" />}
              {...field} // Spread field props to ensure onChange, onBlur, and value are passed
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
