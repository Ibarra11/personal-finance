import { db } from "@/db";

import { pots } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Data {
  potId: number;
  newAmount: number;
}

export async function addMoneyPot({ potId, newAmount }: Data) {
  return db
    .update(pots)
    .set({ totalSaved: String(newAmount) })
    .where(eq(pots.id, potId))
    .returning();
}
