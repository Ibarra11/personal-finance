import { DeleteRecurringBillInput } from "@/actions/recurring-bills/delete-recurring-bill";
import { db } from "@/db";
import { recurringBills } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteRecurringBillById({
  recurringBillId,
}: DeleteRecurringBillInput) {
  return db
    .delete(recurringBills)
    .where(eq(recurringBills.id, recurringBillId))
    .returning();
}
