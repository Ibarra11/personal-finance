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
  billPayments,
  PAYMENT_FREQUENCY_ENUM,
} from "@/db/schema";

config({ path: ".env.local" });

const getRandomFrequency = () => {
  return PAYMENT_FREQUENCY_ENUM[
    Math.floor(Math.random() * PAYMENT_FREQUENCY_ENUM.length)
  ];
};

const SEED_CATEGORIES = [
  { name: "Food" },
  { name: "Rent" },
  { name: "Utilities" },
  { name: "Shop" },
  { name: "Transportation" },
  { name: "Entertainment" },
  { name: "Healthcare" },
  { name: "Insurance" },
  { name: "Savings" },
  { name: "Debt Payments" },
];

const SEED_THEMES = [
  { name: "Sunny", color: "#FFD700" },
  { name: "Ocean", color: "#1E90FF" },
  { name: "Forest", color: "#228B22" },
  { name: "Sunset", color: "#FF4500" },
  { name: "Blush", color: "#FFB6C1" },
  { name: "Night Sky", color: "#2F4F4F" },
  { name: "Mountain", color: "#A9A9A9" },
];

const SEED_BUDGETS = (categoryIds: any, themeIds: any) => [
  {
    maxSpend: "5000.00",
    categoryId: categoryIds[0], // Link to Food
    themeId: themeIds[0], // Link to Sunny
  },
  {
    maxSpend: "3000.00",
    categoryId: categoryIds[1], // Link to Rent
    themeId: themeIds[1], // Link to Ocean
  },
  {
    maxSpend: "10000.00",
    categoryId: categoryIds[2], // Link to Utilities
    themeId: themeIds[2], // Link to Forest
  },
];

const SEED_POTS = (themeIds: any) => [
  {
    name: "Vacation Fund",
    target: "3000.00",
    totalSaved: "1500.00",
    themeId: themeIds[0], // Link to Sunny
  },
  {
    name: "Emergency Fund",
    target: "5000.00",
    totalSaved: "2500.00",
    themeId: themeIds[1], // Link to Ocean
  },
];

const SEED_BILL_PAYMENTS = (
  recurringBillIds: number[],
  budgetIds: number[],
) => [
  {
    recurringBillId: recurringBillIds[0],
    budgetId: budgetIds[0],
    paymentDate: format(new Date("2024-10-01"), "yyyy-MM-dd"),
    amountPaid: "120.00",
  },
  {
    recurringBillId: recurringBillIds[1],
    budgetId: budgetIds[0],
    paymentDate: format(new Date("2024-10-05"), "yyyy-MM-dd"),
    amountPaid: "75.00",
  },
  {
    recurringBillId: recurringBillIds[2],
    budgetId: budgetIds[1],
    paymentDate: format(new Date("2024-10-10"), "yyyy-MM-dd"),
    amountPaid: "1200.00",
  },
];

const SEED_RECURRING_BILLS = (budgetIds: number[]) => [
  {
    name: "Electricity Bill",
    amount: "120.00",
    startDate: format(new Date("2024-10-05"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[0],
  },
  {
    name: "Water Bill",
    amount: "75.00",
    startDate: format(new Date("2024-10-07"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[0],
  },
  {
    name: "Rent Payment",
    amount: "1200.00",
    startDate: format(new Date("2024-10-01"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[1],
  },
  {
    name: "Internet Bill",
    amount: "60.00",
    startDate: format(new Date("2024-10-10"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[0],
  },
  {
    name: "Gym Membership",
    amount: "30.00",
    startDate: format(new Date("2024-10-25"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[0],
  },
  {
    name: "Netflix Subscription",
    amount: "15.00",
    startDate: format(new Date("2024-10-12"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[2],
  },
  {
    name: "Spotify Subscription",
    amount: "10.00",
    startDate: format(new Date("2024-10-28"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[2],
  },
  {
    name: "Car Insurance",
    amount: "200.00",
    startDate: format(new Date("2024-10-15"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[1],
  },
  {
    name: "Phone Bill",
    amount: "45.00",
    startDate: format(new Date("2024-10-20"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[0],
  },
  {
    name: "Health Insurance Premium",
    amount: "250.00",
    startDate: format(new Date("2024-10-30"), "yyyy-MM-dd"),
    frequency: getRandomFrequency(),
    budgetId: budgetIds[0],
  },
];

const SEED_TRANSACTIONS: (typeof transactions.$inferInsert)[] = [];

const SEED_TRANSACTION = [
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

const generateTransactionsForDay = (day: Date, budgetsFromDb: any[]) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const budget =
      budgetsFromDb[Math.floor(Math.random() * budgetsFromDb.length)];

    const transaction =
      SEED_TRANSACTION[Math.floor(Math.random() * SEED_TRANSACTION.length)];

    const amount = generateRandomAmount(category);

    if (!amount) continue;
    // Add random transaction date within the range
    const transactionDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      Math.floor(Math.random() * 28) + 1,
    );

    SEED_TRANSACTIONS.push({
      budgetId: budget.id, // Use database ID
      createdAt: day,
      updatedAt: day,
      amount: amount.toFixed(2),
      transaction,
      transactionDate,
    });
  }
};

const generateTransactions = (budgetsFromDb: any[]) => {
  const days = eachDayOfInterval({
    start: defaultFrom,
    end: defaultTo,
  });
  days.forEach((day) => generateTransactionsForDay(day, budgetsFromDb));
};

const main = async () => {
  try {
    // Reset DB
    await db.delete(transactions).execute();
    await db.delete(budgets).execute();
    await db.delete(pots).execute();
    await db.delete(categories).execute();
    await db.delete(themes).execute();
    await db.delete(recurringBills).execute(); // Reset recurring bills table
    await db.delete(billPayments).execute(); // Reset bill payments table

    // Seed themes and categories, retrieve inserted records
    const themesFromDb = await db
      .insert(themes)
      .values(SEED_THEMES)
      .returning();
    const categoriesFromDb = await db
      .insert(categories)
      .values(SEED_CATEGORIES)
      .returning();

    // Seed budgets and pots
    const budgetsFromDb = await db
      .insert(budgets)
      .values(
        SEED_BUDGETS(
          categoriesFromDb.map((cat) => cat.id),
          themesFromDb.map((thm) => thm.id),
        ),
      )
      .returning();
    await db
      .insert(pots)
      .values(SEED_POTS(themesFromDb.map((thm) => thm.id)))
      .execute();

    // Seed recurring bills
    const recurringBillsFromDb = await db
      .insert(recurringBills)
      .values(SEED_RECURRING_BILLS(budgetsFromDb.map((bud) => bud.id)))
      .returning();

    await db
      .insert(billPayments)
      .values(
        SEED_BILL_PAYMENTS(
          recurringBillsFromDb.map((bill) => bill.id),
          budgetsFromDb.map((bud) => bud.id),
        ),
      )
      .execute();

    // Generate and seed transactions using database-generated budget IDs
    generateTransactions(budgetsFromDb);
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();

    console.log("Database successfully seeded.");
  } catch (error) {
    console.error("Error during seed", error);
  } finally {
    process.exit(1);
  }
};
main();
