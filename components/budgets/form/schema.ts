import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type AddOrEditFormSchemaType = z.infer<typeof addOrEditFormSchema>;
export type AddOrEditFormType = UseFormReturn<AddOrEditFormSchemaType>;

export const addOrEditFormSchema = z.object({
  budgetCategory: z.object({
    id: z.number(),
    name: z.string(),
  }),
  maxSpend: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Target must be a positive number",
  }),
  theme: z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
  }),
});
