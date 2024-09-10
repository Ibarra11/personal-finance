import * as React from "react";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-beige-500 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-beige-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputProps & { icon: React.ReactNode; variant: "start" | "end" }
>(({ className, icon, variant, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        className={`${className} hover:border-gray-900 ${variant === "start" ? "pl-8" : "pr-8"}`}
        {...props}
      />
      <div
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${variant === "start" ? "left-4" : "right-4"} `}
      >
        <span className="text-gray-900">{icon}</span>
      </div>
    </div>
  );
});

export { Input, InputWithIcon };
