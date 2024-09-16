"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";
import { addMoneyPot } from "@/services/pots/addMoneyPot";
import { revalidatePath } from "next/cache";
import { getPotById } from "@/services/pots/getPotById";

const addMoneySchema = z.object({
  potId: z.number({ required_error: "potId is required" }),
  deposit: z.number({ required_error: "newAmount is required" }),
});

export type AddMoney = z.infer<typeof addMoneySchema>;

export const addMoneyAction = actionClient
  .schema(addMoneySchema)
  .action(async ({ parsedInput: { potId, deposit } }) => {
    try {
      const pot = await getPotById(potId);
      if (!pot) {
        return {
          success: false,
          message: "Pot not found. Please try again or contact support.",
        };
      }
      const result = await addMoneyPot({
        potId,
        newAmount: Number(pot.totalSaved) + deposit,
      });
      if (result.length === 0) {
        return {
          success: false,
          message: "We couldn’t add money to the pot. Please try again.",
        };
      }
      await revalidatePath("/dashboard/pots");
      return { success: true, message: `Money added to pot ID ${potId}` };
    } catch (error) {
      return { success: false, message: "An error occurred." };
    }
  });
