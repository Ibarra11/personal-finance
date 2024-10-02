import { PAYMENT_FREQUENCY_ENUM } from "@/db/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type CreateOrEditBillFormSchemaType = z.infer<
  typeof createOrEditBillFormSchema
>;

export type CreateOrEditBillFormType =
  UseFormReturn<CreateOrEditBillFormSchemaType>;

export const createOrEditBillFormSchema = z.object({
  name: z
    .string()
    .min(3, "Bill name must be at least 3 characters long")
    .max(30, "Bill name must be 30 characters or less"),
  startDate: z.date(),
  budgetId: z.number(),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
    .refine((val) => parseFloat(val) > 0, {
      message: "Amount must be greater than 0",
    }),
  frequency: z.enum(PAYMENT_FREQUENCY_ENUM),
});
