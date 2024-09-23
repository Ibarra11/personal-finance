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
  { id: 5, name: "Transportation" },
  { id: 6, name: "Entertainment" },
  { id: 7, name: "Healthcare" },
  { id: 8, name: "Insurance" },
  { id: 9, name: "Savings" },
  { id: 10, name: "Debt Payments" },
  { id: 11, name: "Education" },
  { id: 12, name: "Dining Out" },
  { id: 13, name: "Personal Care" },
  { id: 14, name: "Subscriptions" }, // Blank Category
  { id: 15, name: "Gifts & Donations" },
  { id: 16, name: "Childcare" }, // Blank Category
  { id: 17, name: "Pets" },
  { id: 18, name: "Home Maintenance" },
  { id: 19, name: "Clothing" }, // Blank Category
  { id: 20, name: "Miscellaneous" }, // Blank Category
];

const SEED_BUDGETS = [
  {
    id: 1,
    name: "Monthly Expenses",
    maxSpend: "5000.00",
    categoryId: 1,
    themeId: 1,
  },
  {
    id: 2,
    name: "Vacation Fund",
    maxSpend: "3000.00",
    categoryId: 2,
    themeId: 2,
  },
  {
    id: 3,
    name: "Home Renovation",
    maxSpend: "10000.00",
    categoryId: 3,
    themeId: 3,
  },
  {
    id: 4,
    name: "Education Savings",
    maxSpend: "8000.00",
    categoryId: 4,
    themeId: 4,
  },
  {
    id: 5,
    name: "Emergency Fund",
    maxSpend: "7000.00",
    categoryId: 2,
    themeId: 5,
  },
];

const SEED_THEMES = [
  { id: 1, name: "Sunny", color: "#FFD700" },
  { id: 2, name: "Ocean", color: "#1E90FF" },
  { id: 3, name: "Forest", color: "#228B22" },
  { id: 4, name: "Sunset", color: "#FF4500" },
  { id: 5, name: "Blush", color: "#FFB6C1" },
  { id: 6, name: "Night Sky", color: "#2F4F4F" },
  { id: 7, name: "Mountain", color: "#A9A9A9" },
  { id: 8, name: "Lavender", color: "#E6E6FA" },
  { id: 9, name: "Fire", color: "#FF6347" },
  { id: 10, name: "Royal", color: "#4169E1" },
];

const SEED_POTS = [
  {
    id: 1,
    name: "Vacation Fund",
    target: "3000.00",
    totalSaved: "1500.00",
    themeId: 1,
  },
  {
    id: 2,
    name: "Emergency Fund",
    target: "5000.00",
    totalSaved: "2500.00",
    themeId: 2,
  },
  {
    id: 3,
    name: "Home Renovation",
    target: "10000.00",
    totalSaved: "4500.00",
    themeId: 3,
  },
  {
    id: 4,
    name: "New Car",
    target: "20000.00",
    totalSaved: "12000.00",
    themeId: 4,
  },
  {
    id: 5,
    name: "Wedding Savings",
    target: "15000.00",
    totalSaved: "6000.00",
    themeId: 5,
  },
  {
    id: 6,
    name: "Retirement Fund",
    target: "500000.00",
    totalSaved: "150000.00",
    themeId: 6,
  },
  {
    id: 7,
    name: "Travel Adventure",
    target: "8000.00",
    totalSaved: "3200.00",
    themeId: 7,
  },
  {
    id: 8,
    name: "Gadget Upgrade",
    target: "1200.00",
    totalSaved: "700.00",
    themeId: 8,
  },
  {
    id: 9,
    name: "Fitness Equipment",
    target: "3000.00",
    totalSaved: "2000.00",
    themeId: 9,
  },
  {
    id: 10,
    name: "Education Fund",
    target: "10000.00",
    totalSaved: "4000.00",
    themeId: 10,
  },
];

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

// Example list of recipients (any entity)
const SEED_PARTIES = [
  "Amazon",
  "Local Grocery",
  "Utility Company",
  "Rent Office",
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 900;
    case "Utilities":
      return Math.random() * 300 + 50;
    case "Food":
    case "Dining Out":
      return Math.random() * 100 + 20;
    case "Transportation":
      return Math.random() * 60 + 10;
    case "Entertainment":
      return Math.random() * 80 + 10;
    case "Healthcare":
      return Math.random() * 300 + 50;
    case "Insurance":
      return Math.random() * 150 + 200;
    case "Savings":
    case "Debt Payments":
      return Math.random() * 500 + 100;
    case "Gifts & Donations":
      return Math.random() * 200 + 30;
    case "Personal Care":
      return Math.random() * 50 + 20;
    case "Home Maintenance":
      return Math.random() * 200 + 100;

    // For categories without specific amounts, return a default or skip
    default:
      return null; // Leave blank categories with no specific logic
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const party = SEED_PARTIES[Math.floor(Math.random() * SEED_PARTIES.length)];

    const amount = generateRandomAmount(category);

    // Skip the transaction if amount is null (i.e., blank category)
    if (!amount) continue;

    SEED_TRANSACTIONS.push({
      budgetId: SEED_BUDGETS[0].id,
      createdAt: day,
      updatedAt: day,
      amount: amount.toFixed(2),
      party,
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
