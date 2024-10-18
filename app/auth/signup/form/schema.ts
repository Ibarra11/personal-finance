"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name must be 50 characters or less."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(2, "Email must be at least 2 characters long.")
    .max(50, "Email must be 50 characters or less."),
  createPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password must be 50 characters or less."),
});

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

export type SignupFormType = UseFormReturn<SignupFormSchemaType>;
