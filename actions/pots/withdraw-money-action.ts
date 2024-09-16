"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";
import { revalidatePath } from "next/cache";
import { withdrawMoneyPot } from "@/services/pots/withdrawMoneyPot";
import { getPotById } from "@/services/pots/getPotById";

const withdrawMoneySchema = z.object({
  potId: z.number({ required_error: "potId is required" }),
  withdrawAmount: z
    .number({ required_error: "newAmount is required" })
    .positive("The withdrawal amount must be greater than zero."),
});

export type WithdrawMoney = z.infer<typeof withdrawMoneySchema>;

export const withdrawMoneyAction = actionClient
  .schema(withdrawMoneySchema)
  .action(async ({ parsedInput: { potId, withdrawAmount } }) => {
    try {
      const pot = await getPotById(potId);

      if (!pot) {
        return {
          success: false,
          message: "Pot not found. Please try again or contact support.",
        };
      }

      if (withdrawAmount > Number(pot.totalSaved)) {
        return {
          success: false,
          message:
            "The withdrawal amount cannot exceed the total available balance.",
        };
      }

      const result = await withdrawMoneyPot({
        potId,
        newAmount: Number(pot.totalSaved) - withdrawAmount,
      });

      if (result.length === 0) {
        return {
          success: false,
          message: "We couldn’t withdraw money from the pot. Please try again.",
        };
      }

      await revalidatePath("/dashboard/pots");

      return {
        success: true,
        message: `Money successfully withdrawn from pot ID ${potId}`,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred. Please try again later.",
      };
    }
  });
