
export const formatPrice = (price: number): string => {
  if (price >= 1000000) return `£${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `£${Math.round(price / 1000)}k`;
  return `£${price.toLocaleString()}`;
};

export const formatPriceChange = (change: number) => {
  const absChange = Math.abs(change);
  const symbol = change >= 0 ? "↗" : "↘";
  const color = change >= 0 ? "text-green-600" : "text-red-600";
  return {
    symbol,
    formatted: `${absChange.toFixed(1)}%`,
    color,
    isPositive: change >= 0,
  };
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toLocaleString();
};
