import { EditRecurringBill } from "@/actions/recurring-bills/edit-recurring-bill-action";
import { db } from "@/db";
import { recurringBills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatDate } from "../helpers";

export async function editRecurringBillById({
  recurringBillId,
  amount,
  budgetId,
  startDate,
  name,
  frequency,
}: EditRecurringBill) {
  return db
    .update(recurringBills)
    .set({
      amount,
      budgetId,
      startDate: formatDate(startDate),
      name,
      frequency,
    })
    .where(eq(recurringBills.id, recurringBillId))
    .returning();
}
