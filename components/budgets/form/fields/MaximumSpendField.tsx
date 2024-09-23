import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputWithIcon } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { AddOrEditFormType } from "../schema";

export default function MaximumSpendField({
  form,
}: {
  form: AddOrEditFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="maxSpend"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Maximum Spend</FormLabel>
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
