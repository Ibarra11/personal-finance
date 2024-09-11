"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface Props {
  totalSaved: number;
  target: number;
  progressAfterDeposit: number;
  progress: number;
}

export default function DepositProgress({
  totalSaved,
  target,
  progressAfterDeposit,
  progress,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">New Amount</p>
        <p className="text-2xl font-bold text-gray-900">${totalSaved}</p>
      </div>
      <div className="space-y-3">
        <DepositProgressBar
          progressAfterDeposit={progressAfterDeposit}
          progress={progress}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <p
            className={`font-bold ${progress === progressAfterDeposit ? "text-gray-900" : "text-green"}`}
          >
            {progressAfterDeposit}%
          </p>
          <p>Target of ${target}</p>
        </div>
      </div>
    </div>
  );
}

const DepositProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    Pick<Props, "progressAfterDeposit" | "progress">
>(({ className, value, progressAfterDeposit, progress, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-background",
      className,
    )}
    {...props}
  >
    <div
      style={{
        width: `${progress}%`,
      }}
      className="absolute z-10 h-full w-full flex-1 bg-gray-900 transition-all"
    ></div>
    {progress !== progressAfterDeposit && (
      <ProgressPrimitive.Indicator
        className={`absolute h-full flex-1 rounded-r-full bg-green transition-all`}
        style={{
          width: `${progressAfterDeposit - progress}%`,
          left: `calc(${progress}% + 2px)`,
        }}
      />
    )}
  </ProgressPrimitive.Root>
));
