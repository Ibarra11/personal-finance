import { db } from "@/db";

export async function getAllPots() {
  return db.query.pots.findMany({
    with: {
      theme: {
        columns: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
    orderBy: (pots, { desc }) => [desc(pots.updatedAt)],
  });
}
