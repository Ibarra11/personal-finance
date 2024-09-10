import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { InputWithIcon } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import { AddPortFormType } from "../AddPotForm";

export default function PotNameField({ form }: { form: AddPortFormType }) {
  return (
    <FormField
      control={form.control}
      name="potName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pot Name</FormLabel>
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
