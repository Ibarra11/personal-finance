import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type TransactionFormSchemaType = z.infer<typeof transactionFormSchema>;

export type TransactionFormType = UseFormReturn<TransactionFormSchemaType>;

export const transactionFormSchema = z.object({
  transaction: z
    .string()
    .min(3, "Transaction name must be at least 3 characters long")
    .max(30, "Transaction name must be 30 characters of less"),
  budgetId: z.number(),
  transactionDate: z.date(),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
});
