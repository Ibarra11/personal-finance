import { CreatePot } from "@/actions/pots/create-pot-action";
import { db } from "@/db";
import { pots } from "@/db/schema";

export async function createPot({ potName, potTarget, potThemeId }: CreatePot) {
  return db
    .insert(pots)
    .values({
      name: potName,
      target: potTarget,
      themeId: potThemeId,
    })
    .returning();
}
