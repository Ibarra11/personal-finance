import { CreateOrEditBillFormSchemaType } from "@/components/recurring-bills/form/schema";
import { db } from "@/db";
import { recurringBills } from "@/db/schema";
import { formatDate } from "../helpers";

export async function createRecuringBill({
  name,
  amount,
  budgetId,
  startDate,
  frequency,
}: CreateOrEditBillFormSchemaType) {
  return db
    .insert(recurringBills)
    .values({
      name,
      amount,
      budgetId,
      startDate: formatDate(startDate),
      frequency,
    })
    .returning();
}
