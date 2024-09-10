"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import WithDrawPotField from "./fields/WithdrawPotField";
import PotProgress from "../PotProgress";
import WithdrawProgress from "../WithdrawProgress";

interface Props {
  totalSaved: number;
  target: number;
}

const formSchema = z.object({
  withdrawAmount: z.number().min(0, "Withdraw amount must be positive"),
});

export type WithDrawPotFormType = UseFormReturn<z.infer<typeof formSchema>>;

export default function WithdrawPortForm({ totalSaved, target }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      withdrawAmount: 0, // Default value for withdraw amount
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submit
  }

  // Watch for changes in withdrawAmount and automatically trigger re-renders
  const watchWithdrawAmount = form.watch("withdrawAmount");
  console.log(watchWithdrawAmount);

  const progressAfterWithdraw =
    ((totalSaved - watchWithdrawAmount) / target) * 100;
  const withdrawProgress = (totalSaved / target) * 100;
  console.log(progressAfterWithdraw);
  console.log(withdrawProgress);

  return (
    <div>
      {/* Pass calculated progress values to the progress components */}
      <WithdrawProgress
        progressAfterWithdraw={progressAfterWithdraw}
        withdrawProgress={withdrawProgress}
        totalSaved={totalSaved - watchWithdrawAmount}
        target={target}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <WithDrawPotField form={form} />
          <Button className="w-full" type="submit">
            Add Pot
          </Button>
        </form>
      </Form>
    </div>
  );
}
