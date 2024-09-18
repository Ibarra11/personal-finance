import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type AddOrEditFormSchemaType = z.infer<typeof addOrEditFormSchema>;
export type AddOrEditFormType = UseFormReturn<AddOrEditFormSchemaType>;

export const addOrEditFormSchema = z.object({
  potName: z
    .string()
    .min(3, "Pot name must be at least 3 characters long")
    .max(30, "Pot name must be 30 characters or less"),
  target: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Target must be a positive number",
  }),
  theme: z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
  }),
});
