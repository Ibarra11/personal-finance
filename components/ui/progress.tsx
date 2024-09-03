"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<
    typeof ProgressPrimitive.Root & { color: string }
  >
>(({ className, value, color, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-8 w-full overflow-hidden rounded-full bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full rounded-sm transition-all ${color}`}
      style={{ width: `${value}%` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
