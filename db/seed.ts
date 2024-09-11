import { config } from "dotenv";
import { db } from ".";
import { subDays, eachDayOfInterval, format } from "date-fns";
import { categories, transactions, budgets, pots, themes } from "@/db/schema";

config({ path: ".env.local" });

const SEED_CATEGORIES = [
  { id: 1, name: "Food" },
  { id: 2, name: "Rent" },
  { id: 3, name: "Utilities" },
  { id: 4, name: "Shop" },
];

const SEED_BUDGETS = [
  {
    id: 1,
    name: "Monthly Budget",
    maxSpend: "2000.00",
    categoryId: 1,
  },
  {
    id: 2,
    name: "Utilities Budget",
    maxSpend: "500.00",
    categoryId: 2,
  },
];

const SEED_POTS = [
  {
    id: 1,
    name: "Vacation Fund",
    target: "1500.00",
    totalSaved: "500.00",
    themeId: 1,
  },
];

const SEED_THEMES = [{ id: 1, name: "Sunny", color: "yellow" }];

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "Utilities":
      return Math.random() * 400 + 90;
    case "Food":
      return Math.random() * 30 + 10;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;

    const amount = generateRandomAmount(category);
    const formattedAmount = (isExpense ? -amount : amount).toFixed(2);

    SEED_TRANSACTIONS.push({
      budgetId: SEED_BUDGETS[0].id,
      categoryId: category.id,
      createdAt: day,
      updatedAt: day,
      amount: formattedAmount,
      type: isExpense ? "payment" : "deposit",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({
    start: defaultFrom,
    end: defaultTo,
  });
  days.forEach((day) => generateTransactionsForDay(day));
};
generateTransactions();

const main = async () => {
  try {
    // Reset DB
    await db.delete(transactions).execute();
    await db.delete(budgets).execute();
    await db.delete(pots).execute();
    await db.delete(categories).execute();
    await db.delete(themes).execute();

    // Seed themes
    await db.insert(themes).values(SEED_THEMES).execute();

    // Seed categories
    await db.insert(categories).values(SEED_CATEGORIES).execute();

    // Seed budgets
    await db.insert(budgets).values(SEED_BUDGETS).execute();

    // Seed pots
    await db.insert(pots).values(SEED_POTS).execute();

    // Seed transactions
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    console.log("Database successfully seeded.");
  } catch (error) {
    console.error("Error during seed", error);
  } finally {
    process.exit(1);
  }
};
main();
