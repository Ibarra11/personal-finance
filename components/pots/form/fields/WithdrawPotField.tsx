import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputWithIcon } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { WithDrawPotFormType } from "../WithdrawPotForm";

export default function WithDrawPotField({
  form,
}: {
  form: WithDrawPotFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="withdrawAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Withdraw Amount</FormLabel>
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
