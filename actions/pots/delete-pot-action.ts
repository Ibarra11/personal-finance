"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";

import { deletePotById } from "@/services/pots/deletePotById";

const deletePotSchema = z.object({
  potId: z.number({ required_error: "potId is required" }),
});

export const deletePotAction = actionClient
  .schema(deletePotSchema)
  .action(async ({ parsedInput: { potId } }) => {
    try {
      const deletedPot = await deletePotById(potId);

      if (deletedPot.length === 0) {
        return {
          success: false,
          message: "Issue deleting pot. Please try again.",
        };
      }

      await revalidatePath("/dashboard/pots");

      return {
        success: true,
        message: `Pot with ID ${potId} successfully deleted.`,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while trying to delete the pot.",
      };
    }
  });
