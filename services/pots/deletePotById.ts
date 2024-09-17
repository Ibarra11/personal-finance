import { db } from "@/db";
import { pots } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deletePotById(potId: number) {
  return db.delete(pots).where(eq(pots.id, potId)).returning();
}
