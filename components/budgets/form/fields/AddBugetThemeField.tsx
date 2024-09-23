"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CircleCheck } from "lucide-react";
import { AddOrEditFormType } from "../schema";
import { useRef } from "react";
import { useBudgetsContext } from "@/app/dashboard/budgets/page.context";

export default function AddBudgetThemeField({
  form,
}: {
  form: AddOrEditFormType;
}) {
  const { themes } = useBudgetsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const isInDisabledFieldset = Boolean(
    ref.current?.closest("fieldset:disabled"),
  );

  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Theme</FormLabel>
          <Select
            onValueChange={(e) => {
              field.onChange(themes.find((theme) => theme.id === Number(e)));
            }}
          >
            <FormControl>
              <SelectTrigger disabled={isInDisabledFieldset} ref={ref}>
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-72" side="bottom" align="start">
              {themes.map((theme) => (
                <SelectItem
                  disabled={theme.taken}
                  key={theme.id}
                  className="group rounded-none border-b border-gray-100 last:border-b-0 hover:bg-none focus-visible:bg-none"
                  value={String(theme.id)}
                >
                  <div className="flex w-[var(--radix-popper-anchor-width)] items-center gap-3 rounded-md group-[data-state=open]:hover:bg-accent group-[data-state=open]:focus-visible:bg-accent">
                    <div
                      style={{ background: theme.color }}
                      className="size-4 rounded-full"
                    ></div>
                    <p className="text-sm">{theme.name}</p>

                    <div className="invisible ml-auto group-data-[state=checked]:visible">
                      <CircleCheck className="size-4 fill-green text-white" />
                    </div>
                    {theme.taken && (
                      <p className="ml-auto text-xs text-gray-500">
                        Already Taken
                      </p>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
