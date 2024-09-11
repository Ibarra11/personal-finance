"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import WithDrawPotField from "./fields/WithdrawPotField";
import PotProgress from "../PotProgress";
import WithdrawProgress from "../WithdrawProgress";
import DepositPotField from "./fields/DepositPotField";
import DepositProgress from "../DepositProgress";

interface Props {
  totalSaved: number;
  target: number;
}

const formSchema = z.object({
  depositAmount: z.number().min(0, "Deposit amount must be positive"),
});

export type DepositPotFormType = UseFormReturn<z.infer<typeof formSchema>>;

export default function DepositPortForm({ totalSaved, target }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      depositAmount: 0, // Default value for withdraw amount
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submit
  }

  // Watch for changes in withdrawAmount and automatically trigger re-renders
  const watchDepositAmount = Number(form.watch("depositAmount"));

  const progressAfterDeposit =
    ((totalSaved + watchDepositAmount) / target) * 100;
  const progress = (totalSaved / target) * 100;

  return (
    <>
      {/* Pass calculated progress values to the progress components */}
      <DepositProgress
        progressAfterDeposit={progressAfterDeposit}
        progress={progress}
        totalSaved={totalSaved + watchDepositAmount}
        target={target}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DepositPotField form={form} />
          <Button className="w-full" type="submit">
            Confirm Addition
          </Button>
        </form>
      </Form>
    </>
  );
}
