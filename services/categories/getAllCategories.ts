import { db } from "@/db";

export async function getAllCategories() {
  return db.query.categories.findMany({
    columns: {
      name: true,
    },
  });
}
