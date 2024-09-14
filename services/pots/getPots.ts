import { db } from "@/db";

export type Pot = Awaited<ReturnType<typeof getPots>>[number];

export async function getPots() {
  return db.query.pots.findMany({
    with: {
      theme: {
        columns: {
          color: true,
        },
      },
    },
  });
}
