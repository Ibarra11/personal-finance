"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchemaType } from "./form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailField from "./form/fields/EmailField";
import PasswordField from "./form/fields/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export default function Login() {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-xl space-y-8 rounded-xl bg-white px-5 py-6 drop-shadow md:p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <div className="flex flex-col gap-4">
          <EmailField form={form} />
          <PasswordField form={form} />
        </div>
        <SubmitButton text="Login" />
        <p className="text-center text-sm text-gray-500">
          Need to create an account?{" "}
          <Link
            href="/auth/signup"
            className="font-bold text-gray-500 underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
