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
  dueDate: z.date(),
  budgetId: z.number(),
  amount: z.string(),
});
