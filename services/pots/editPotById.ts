import { EditPot } from "@/actions/pots/edit-pot-action";
import { db } from "@/db";
import { pots } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editPotById({
  potId,
  potName,
  potTarget,
  potThemeId,
}: EditPot) {
  return db
    .update(pots)
    .set({ name: potName, target: potTarget, themeId: potThemeId })
    .where(eq(pots.id, potId))
    .returning();
}
