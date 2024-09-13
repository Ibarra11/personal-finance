import { db } from "@/db";

export async function getCategories() {
  return db.query.categories.findMany({
    columns: {
      name: true,
    },
  });
}
