"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { PotProgressProps } from "./PotProgress";

type Props = Omit<PotProgressProps, "totalSaved" | "target">;

const PotsProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & Props
>(({ className, value, type, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-background",
      className,
    )}
    {...props}
  >
    {type === "default" && (
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 bg-green transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    )}

    {/* <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 transition-all ${color}`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    /> */}
  </ProgressPrimitive.Root>
));

function WithDrawBar() {
  return null;
}

PotsProgressBar.displayName = ProgressPrimitive.Root.displayName;

export default PotsProgressBar;
