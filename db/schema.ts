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
} from "drizzle-orm/pg-core";

// Enum for transaction type
export const transactionTypeEnum = pgEnum("transaction_type", [
  "deposit",
  "payment",
]);

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    party: varchar("party", { length: 255 }).notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    type: transactionTypeEnum("type").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull()
      .defaultNow(),
    budgetId: integer("budget_id")
      .references(() => budgets.id, { onDelete: "cascade" })
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),
  },
  (table) => ({
    budgetIdx: index("budget_idx").on(table.budgetId),
    transactionsCategoryIdx: index("transactions_category_idx").on(
      table.categoryId,
    ),
  }),
);
// a transaction belongs to a single budget
export const transactionsRelations = relations(transactions, ({ one }) => ({
  budget: one(budgets, {
    fields: [transactions.budgetId],
    references: [budgets.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    maxSpend: numeric("max_spend", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
    categoryId: integer("category_id").references(() => categories.id),
    themeId: integer("theme_id")
      .references(() => themes.id)
      .notNull(),
  },
  (table) => ({
    budgetCategoryIdx: index("budget_category_idx").on(table.categoryId),
    budgetThemeIdx: index("budget_theme_idx").on(table.themeId),
  }),
);
// a budget can have many transactions
export const budgetsRelations = relations(budgets, ({ many }) => ({
  transactions: many(transactions),
}));

export const pots = pgTable(
  "pots",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 30 }).notNull(),
    target: numeric("target", { precision: 10, scale: 2 }).notNull(),
    totalSaved: numeric("total_saved", { precision: 10, scale: 2 }).notNull(),
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
// each pot has one theme
export const potsRelations = relations(pots, ({ one }) => ({
  theme: one(themes, {
    fields: [pots.themeId],
    references: [themes.id],
  }),
}));

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
