import { db } from "@/db";
import { pots } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPotById(potId: number) {
  return db.query.pots.findFirst({
    where: (pots, { eq }) => eq(pots.id, potId),
  });
}
