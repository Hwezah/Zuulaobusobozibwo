import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an integer UGX amount, e.g. 30000 -> "UGX 30,000". */
export function ugx(amount: number): string {
  return "UGX " + amount.toLocaleString("en-US");
}
