"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SignupFormType } from "../schema";
export default function CreatePasswordField({
  form,
}: {
  form: SignupFormType;
}) {
  return (
    <FormField
      control={form.control}
      name="createPassword"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Create Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
          {!fieldState.error && (
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
