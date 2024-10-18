"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(2, "Email must be at least 2 characters long.")
    .max(50, "Email must be 50 characters or less."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password must be 50 characters or less."),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export type LoginFormType = UseFormReturn<LoginFormSchemaType>;
