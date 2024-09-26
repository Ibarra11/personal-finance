import { config } from "dotenv";
import { db } from ".";
import { subDays, eachDayOfInterval, format } from "date-fns"; // Import format to handle date formatting
import {
  categories,
  transactions,
  budgets,
  pots,
  themes,
  recurringBills,
} from "@/db/schema";

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
];

const SEED_THEMES = [
  { id: 1, name: "Sunny", color: "#FFD700" },
  { id: 2, name: "Ocean", color: "#1E90FF" },
  { id: 3, name: "Forest", color: "#228B22" },
  { id: 4, name: "Sunset", color: "#FF4500" },
  { id: 5, name: "Blush", color: "#FFB6C1" },
  { id: 6, name: "Night Sky", color: "#2F4F4F" },
  { id: 7, name: "Mountain", color: "#A9A9A9" },
];

const SEED_BUDGETS = [
  {
    id: 1,
    name: "Monthly Expenses",
    maxSpend: "5000.00",
    categoryId: 1, // Linked to Food
    themeId: 1, // Linked to Sunny
  },
  {
    id: 2,
    name: "Vacation Fund",
    maxSpend: "3000.00",
    categoryId: 2, // Linked to Rent
    themeId: 2, // Linked to Ocean
  },
  {
    id: 3,
    name: "Home Renovation",
    maxSpend: "10000.00",
    categoryId: 3, // Linked to Utilities
    themeId: 3, // Linked to Forest
  },
];

const SEED_POTS = [
  {
    id: 1,
    name: "Vacation Fund",
    target: "3000.00",
    totalSaved: "1500.00",
    themeId: 1, // Linked to Sunny
  },
  {
    id: 2,
    name: "Emergency Fund",
    target: "5000.00",
    totalSaved: "2500.00",
    themeId: 2, // Linked to Ocean
  },
];

const SEED_RECURRING_BILLS = [
  {
    name: "Electricity Bill",
    amount: "120.00",
    dueDate: format(new Date("2024-10-05"), "yyyy-MM-dd"), // Format date
    budgetId: 1, // Link to the "Monthly Expenses" budget
  },
  {
    name: "Water Bill",
    amount: "75.00",
    dueDate: format(new Date("2024-10-07"), "yyyy-MM-dd"), // Format date
    budgetId: 1, // Link to the "Monthly Expenses" budget
  },
  {
    name: "Rent Payment",
    amount: "1200.00",
    dueDate: format(new Date("2024-10-01"), "yyyy-MM-dd"), // Format date
    budgetId: 2, // Link to the "Vacation Fund" budget
  },
];

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

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
    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const budget =
      SEED_BUDGETS[Math.floor(Math.random() * SEED_BUDGETS.length)]; // Randomly select a budget
    const isExpense = Math.random() > 0.6;
    const party = SEED_PARTIES[Math.floor(Math.random() * SEED_PARTIES.length)];

    const amount = generateRandomAmount(category);

    if (!amount) continue;

    SEED_TRANSACTIONS.push({
      budgetId: budget.id, // Assign random budgetId
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
    await db.delete(recurringBills).execute(); // Reset recurring bills table

    // Seed themes
    await db.insert(themes).values(SEED_THEMES).execute();

    // Seed categories
    await db.insert(categories).values(SEED_CATEGORIES).execute();

    // Seed budgets
    await db.insert(budgets).values(SEED_BUDGETS).execute();

    // Seed pots
    await db.insert(pots).values(SEED_POTS).execute();

    // Seed recurring bills
    await db.insert(recurringBills).values(SEED_RECURRING_BILLS).execute();

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
