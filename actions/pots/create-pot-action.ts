"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";

import { createPot } from "@/services/pots/createPot";

const createPotSchema = z.object({
  potName: z.string(),
  potTarget: z.string(),
  potThemeId: z.number(),
});

export type CreatePot = z.infer<typeof createPotSchema>;

export const createPotAction = actionClient
  .schema(createPotSchema)
  .action(async ({ parsedInput: { potName, potTarget, potThemeId } }) => {
    try {
      const createdPot = await createPot({
        potName,
        potTarget,
        potThemeId,
      });

      if (createdPot.length === 0) {
        return {
          success: false,
          message: "Issue creating pot. Please try again.",
        };
      }

      await revalidatePath("/dashboard/pots");

      return {
        success: true,
        message: `Pot was successfully created.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `An error occurred while trying to create a pot.`,
      };
    }
  });
