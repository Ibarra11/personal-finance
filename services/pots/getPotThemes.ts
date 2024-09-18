import { db } from "@/db";

export async function getPotThemes() {
  return db.query.themes.findMany({
    columns: {
      id: true,
      name: true,
      color: true,
    },
    with: {
      pots: {
        columns: {
          id: true,
        },
      },
    },
  });
  // .then((themes) =>
  //   themes.map((theme) => ({
  //     ...theme,
  //     taken: theme.pots.length > 0,
  //   })),
  // );
}
