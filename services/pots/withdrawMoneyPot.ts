import { db } from "@/db";
import { AddMoney } from "@/actions/pots/add-money-action";
import { pots } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function withdrawMoneyPot({ potId, newAmount }: AddMoney) {
  return db
    .update(pots)
    .set({ totalSaved: String(newAmount) })
    .where(eq(pots.id, potId))
    .returning();
}
