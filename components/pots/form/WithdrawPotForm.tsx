"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import WithDrawPotField from "./fields/WithdrawPotField";

import WithdrawProgress from "../WithdrawProgress";
import { AddMoney } from "@/actions/pots/add-money-action";
import { Loader } from "lucide-react";
import { WithdrawMoney } from "@/actions/pots/withdraw-money-action";
import SubmitButton from "../../SubmitButton";

interface Props {
  potId: number;
  totalSaved: number;
  target: number;
  onWithdrawMoney: (args: WithdrawMoney) => void;
  isPending: boolean;
}

const formSchema = z.object({
  withdrawAmount: z.coerce.number().min(0, "Withdraw amount must be positive"),
});

export type WithDrawPotFormType = UseFormReturn<z.infer<typeof formSchema>>;

export default function WithdrawPortForm({
  potId,
  totalSaved,
  target,
  onWithdrawMoney,
  isPending,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      withdrawAmount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.withdrawAmount > totalSaved) {
      form.setError("withdrawAmount", {
        message:
          "The withdrawal amount cannot exceed the total available balance.",
      });
      return;
    }
    onWithdrawMoney({ potId, withdrawAmount: values.withdrawAmount });
  }

  const watchWithdrawAmount = form.watch("withdrawAmount");

  const progressAfterWithdraw =
    ((totalSaved - watchWithdrawAmount) / target) * 100;
  const withdrawProgress = (totalSaved / target) * 100;

  return (
    <div>
      <WithdrawProgress
        progressAfterWithdraw={progressAfterWithdraw}
        withdrawProgress={withdrawProgress}
        totalSaved={totalSaved - watchWithdrawAmount}
        target={target}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="space-y-4" disabled={isPending}>
            <WithDrawPotField form={form} />
            <SubmitButton text="Confirm Withdraw" />
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
