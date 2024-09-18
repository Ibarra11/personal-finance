"use server";

import { z } from "zod";
import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";

import { deletePotById } from "@/services/pots/deletePotById";
import { editPotById } from "@/services/pots/editPotById";

const editPotSchema = z.object({
  potId: z.number({ required_error: "potId is required" }),
  potName: z.string(),
  potTarget: z.string(),
  potThemeId: z.number(),
});

export type EditPot = z.infer<typeof editPotSchema>;

export const editPotAction = actionClient
  .schema(editPotSchema)
  .action(
    async ({ parsedInput: { potId, potName, potTarget, potThemeId } }) => {
      try {
        const editedPot = await editPotById({
          potId,
          potName,
          potTarget,
          potThemeId,
        });

        if (editedPot.length === 0) {
          return {
            success: false,
            message: "Issue editing pot. Please try again.",
          };
        }

        await revalidatePath("/dashboard/pots");

        return {
          success: true,
          message: `Pot with ID ${potId} successfully edited.`,
        };
      } catch (error) {
        return {
          success: false,
          message: `An error occurred while trying to edit pot with ID ${potId} .`,
        };
      }
    },
  );
