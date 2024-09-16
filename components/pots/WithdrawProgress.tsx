"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface Props {
  totalSaved: number;
  target: number;
  progressAfterWithdraw: number;
  withdrawProgress: number;
}

export default function WithdrawProgress({
  totalSaved,
  target,
  progressAfterWithdraw,
  withdrawProgress,
}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">New Amount</p>
        <p className="text-2xl font-bold text-gray-900">${totalSaved}</p>
      </div>
      <div className="space-y-3">
        <WithdrawProgressBar
          progressAfterWithdraw={progressAfterWithdraw}
          withdrawProgress={withdrawProgress}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <p
            className={`font-bold ${withdrawProgress === progressAfterWithdraw ? "text-gray-900" : "text-red"}`}
          >
            {progressAfterWithdraw.toFixed(2)}%
          </p>
          <p>Target of ${target}</p>
        </div>
      </div>
    </div>
  );
}

const WithdrawProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    Pick<Props, "progressAfterWithdraw" | "withdrawProgress">
>(
  (
    { className, value, progressAfterWithdraw, withdrawProgress, ...props },
    ref,
  ) => (
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
          width: `${withdrawProgress}%`,
        }}
        className="absolute h-full w-full flex-1 rounded-r-full bg-red transition-all"
      ></div>
      <ProgressPrimitive.Indicator
        className={`absolute z-10 h-full w-full flex-1 bg-gray-900 transition-all`}
        style={{
          width: `${progressAfterWithdraw}%`,
        }}
      />
    </ProgressPrimitive.Root>
  ),
);
