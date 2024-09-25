import { CreateOrEditBillFormSchemaType } from "@/components/recurring-bills/form/schema";
import { db } from "@/db";
import { recurringBills } from "@/db/schema";

export async function createRecuringBill({
  name,
  amount,
  budgetId,
  dueDate,
}: CreateOrEditBillFormSchemaType) {
  return db
    .insert(recurringBills)
    .values({
      name,
      amount,
      budgetId,
      dueDate: dueDate.toISOString().split("T")[0],
    })
    .returning();
}
