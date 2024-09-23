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

export default function PotTargetField({ form }: { form: AddOrEditFormType }) {
  return (
    <FormField
      control={form.control}
      name="target"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Target</FormLabel>
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
