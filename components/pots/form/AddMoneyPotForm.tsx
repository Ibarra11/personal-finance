"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DepositPotField from "./fields/DepositPotField";
import DepositProgress from "../DepositProgress";
import { AddMoney } from "@/actions/pots/add-money-action";
import { Loader } from "lucide-react";
import SubmitButton from "../../SubmitButton";

interface Props {
  potId: number;
  totalSaved: number;
  target: number;
  onAddMoney: (args: AddMoney) => void;
  isPending: boolean;
}

const formSchema = z.object({
  depositAmount: z.coerce.number().min(0, "Deposit amount must be positive"),
});

export type DepositPotFormType = UseFormReturn<z.infer<typeof formSchema>>;

export default function AddMoneyPotForm({
  totalSaved,
  target,
  potId,
  onAddMoney,
  isPending,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      depositAmount: 0, // Default value for withdraw amount
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddMoney({ potId, deposit: values.depositAmount });
  }

  // Watch for changes in withdrawAmount and automatically trigger re-renders
  const watchDepositAmount = Number(form.watch("depositAmount"));

  const progressAfterDeposit =
    ((totalSaved + watchDepositAmount) / target) * 100;
  const progress = (totalSaved / target) * 100;

  return (
    <>
      <DepositProgress
        progressAfterDeposit={progressAfterDeposit}
        progress={progress}
        totalSaved={totalSaved + watchDepositAmount}
        target={target}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-4" disabled={isPending}>
            <DepositPotField form={form} />
            <SubmitButton text="Confirm Addition" />
          </fieldset>
        </form>
      </Form>
    </>
  );
}
