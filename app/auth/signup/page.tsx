"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailField from "./form/fields/EmailField";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import CreatePasswordField from "./form/fields/CreatePasswordField";
import NameField from "./form/fields/NameField";
import { signupFormSchema, SignupFormSchemaType } from "./form/schema";

export default function Signup() {
  const form = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      createPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: SignupFormSchemaType) {
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
        <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <NameField form={form} />
          <EmailField form={form} />
          <CreatePasswordField form={form} />
        </div>
        <SubmitButton text="Create Account" />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-gray-500 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
