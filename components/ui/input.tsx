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
          "border-beige-500 placeholder:text-beige-500 flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
  InputProps & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => {
  return (
    <Label className="relative">
      <Input
        ref={ref}
        className={`${className} pr-8 hover:border-gray-900`}
        {...props}
      />
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <span className="text-gray-900">{icon}</span>
      </div>
    </Label>
  );
});

export { Input, InputWithIcon };
