import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `£${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `£${Math.round(price / 1000)}k`;
  } else {
    return `£${price.toLocaleString()}`;
  }
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

// Price change formatting
export function formatPriceChange(change: number): {
  formatted: string;
  color: string;
  symbol: string;
} {
  const isPositive = change > 0;
  const isNeutral = Math.abs(change) < 0.1;

  return {
    formatted: `${Math.abs(change).toFixed(1)}%`,
    color: isNeutral
      ? "text-gray-500"
      : isPositive
      ? "text-green-600"
      : "text-red-600",
    symbol: isNeutral ? "" : isPositive ? "↗" : "↘",
  };
}

// Postcode validation
export function isValidPostcode(postcode: string): boolean {
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
  return postcodeRegex.test(postcode.trim());
}

// Date formatting (hydration-safe)
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Format numbers consistently (hydration-safe)
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
