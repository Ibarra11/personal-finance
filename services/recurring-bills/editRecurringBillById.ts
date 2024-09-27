import { EditRecurringBill } from "@/actions/recurring-bills/edit-recurring-bill-action";
import { db } from "@/db";
import { recurringBills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatDate } from "./helpers";

export async function editRecurringBillById({
  recurringBillId,
  amount,
  budgetId,
  dueDate,
  name,
}: EditRecurringBill) {
  return db
    .update(recurringBills)
    .set({ amount, budgetId, dueDate: formatDate(dueDate), name })
    .where(eq(recurringBills.id, recurringBillId))
    .returning();
}
