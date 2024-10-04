import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  numeric,
  text,
  serial,
  pgEnum,
  timestamp,
  varchar,
  integer,
  index,
  uniqueIndex,
  date,
} from "drizzle-orm/pg-core";

export const recurringBillsFrequencyEnum = pgEnum("recurring_bills_frequency", [
  "Daily",
  "Weekly",
  "Monthly",
]);

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    transaction: varchar("transaction", { length: 255 }).notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
    budgetId: integer("budget_id")
      .references(() => budgets.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    budgetIdx: index("budget_idx").on(table.budgetId),
  }),
);

export const budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    maxSpend: numeric("max_spend", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),
    themeId: integer("theme_id")
      .references(() => themes.id)
      .notNull(),
  },
  (table) => ({
    budgetCategoryIdx: index("budget_category_idx").on(table.categoryId),
    budgetThemeIdx: index("budget_theme_idx").on(table.themeId),
  }),
);

export const pots = pgTable(
  "pots",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 30 }).notNull(),
    target: numeric("target", { precision: 10, scale: 2 }).notNull(),
    totalSaved: numeric("total_saved", { precision: 10, scale: 2 })
      .notNull()
      .default("0.00"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    themeId: integer("theme_id")
      .references(() => themes.id)
      .notNull(),
  },
  (table) => ({
    themeIdx: index("theme_idx").on(table.themeId),
  }),
);

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => ({
    categoryNameUniqueIndex: uniqueIndex("category_name_unique_index").on(
      sql`lower(${table.name})`,
    ),
  }),
);

export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const recurringBills = pgTable("recurring_bills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  startDate: date("start_date").notNull(),
  frequency: recurringBillsFrequencyEnum(
    "recuring_bills_frequency_enum",
  ).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  budgetId: integer("budget_id")
    .references(() => budgets.id, { onDelete: "cascade" })
    .notNull(),
});

export const billPayments = pgTable("bill_payments", {
  id: serial("id").primaryKey(),
  recurringBillId: integer("recurring_bill_id")
    .references(() => recurringBills.id, { onDelete: "cascade" })
    .notNull(),
  budgetId: integer("budget_id")
    .references(() => budgets.id, {
      onDelete: "cascade",
    })
    .notNull(),
  paymentDate: date("payment_date").notNull(),
  amountPaid: numeric("amount_paid", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const budgetsRelations = relations(budgets, ({ many, one }) => ({
  transactions: many(transactions),
  recurringBills: many(recurringBills),
  theme: one(themes, {
    fields: [budgets.themeId],
    references: [themes.id],
  }),
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
  payments: many(billPayments),
}));

export const recurringBillsRelations = relations(
  recurringBills,
  ({ one, many }) => ({
    budget: one(budgets, {
      fields: [recurringBills.budgetId],
      references: [budgets.id],
    }),
    payments: many(billPayments),
  }),
);

export const potsRelations = relations(pots, ({ one }) => ({
  theme: one(themes, {
    fields: [pots.themeId],
    references: [themes.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
}));

export type Transaction = typeof transactions.$inferSelect;
export type Budget = typeof budgets.$inferSelect;
export type Pot = typeof pots.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Theme = typeof themes.$inferSelect;
export type RecurringBill = typeof recurringBills.$inferSelect;
export type Payment = typeof billPayments.$inferSelect;
export const PAYMENT_FREQUENCY_ENUM = recurringBillsFrequencyEnum.enumValues;
