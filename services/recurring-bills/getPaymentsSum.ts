import { db } from "@/db";
import { billPayments } from "@/db/schema";
import { sum, count, between } from "drizzle-orm";
import { formatDate } from "../helpers";

export async function getPaymentsSum() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const result = await db
    .select({
      total: sum(billPayments.amountPaid),
      count: count(billPayments.id),
    })
    .from(billPayments)
    .groupBy()
    .where(
      between(
        billPayments.paymentDate,
        formatDate(startOfMonth),
        formatDate(endOfMonth),
      ),
    );
  return result[0] || { total: "0", count: 0 };
}
