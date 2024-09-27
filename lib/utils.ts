import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getDate } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: string | number) {
  const newValue = Number(value);

  return newValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(value: Date) {
  return value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getDayWithSuffix(date: string) {
  const day = getDate(date);
  const suffix = getDaySuffix(day);
  return `${day}${suffix}`;
}

function getDaySuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
