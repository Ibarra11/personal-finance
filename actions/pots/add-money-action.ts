"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";
import { addMoneyPot } from "@/services/pots/addMoneyPot";
import { revalidatePath } from "next/cache";

const addMoneySchema = z.object({
  potId: z.number({ required_error: "potId is required" }),
  newAmount: z.number({ required_error: "newAmount is required" }),
});

export type AddMoney = z.infer<typeof addMoneySchema>;

export const addMoneyAction = actionClient
  .schema(addMoneySchema)
  .action(async ({ parsedInput: { potId, newAmount } }) => {
    try {
      const result = await addMoneyPot({ potId, newAmount });
      if (result.length === 0) {
        return {
          success: false,
          message: "We couldn’t add money to the pot. Please try again.",
        };
      }
      revalidatePath("/dashboard/pots");
      return { success: true, message: `Money added to pot ID ${potId}` };
    } catch (error) {
      return { success: false, message: "An error occurred." };
    }
  });
