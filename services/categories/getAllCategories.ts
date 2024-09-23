import { db } from "@/db";

export async function getAllCategories() {
  return db.query.categories.findMany({
    columns: {
      id: true,
      name: true,
    },
  });
}

export type Category = Awaited<ReturnType<typeof getAllCategories>>[number];
