import { db } from "@/db";

export type RecurringBill = Awaited<
  ReturnType<typeof getAllRecurringBills>
>[number];

export async function getAllRecurringBills() {
  return db.query.recurringBills.findMany({
    with: {
      budget: {
        columns: {},
        with: {
          category: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: (bills, { desc }) => [desc(bills.updatedAt)],
  });
}
