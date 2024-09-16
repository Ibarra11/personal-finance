import { db } from "@/db";

export type Pot = Awaited<ReturnType<typeof getAllPots>>[number];

export async function getAllPots() {
  return db.query.pots.findMany({
    with: {
      theme: {
        columns: {
          color: true,
        },
      },
    },
    orderBy: (pots, { desc }) => [desc(pots.updatedAt)],
  });
}
