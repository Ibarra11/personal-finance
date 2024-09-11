import {
  pgTable,
  numeric,
  text,
  date,
  serial,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

// Enum for transaction type
export const transactionTypeEnum = pgEnum("transaction_type", [
  "deposit",
  "payment",
]);

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  maxSpend: numeric("max_spend", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
