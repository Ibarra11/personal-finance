import { db } from "@/db";

export async function getAllThemes() {
  return db.query.themes.findMany({
    columns: {
      id: true,
      name: true,
      color: true,
    },
  });
}
