import { Card, CardContent } from "@/components/ui/card";
import { formatPercentage, formatPrice } from "@/lib/utils";

interface BaseStatCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function BaseStatCard({
  title,
  className = "",
  children,
}: BaseStatCardProps) {
  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        {children}
      </CardContent>
    </Card>
  );
}

interface PriceStatCardProps {
  title: string;
  value: number;
  change?: number;
  className?: string;
}

export function PriceStatCard({
  title,
  value,
  change,
  className,
}: PriceStatCardProps) {
  return (
    <BaseStatCard title={title} className={className}>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          {formatPrice(value)}
        </span>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {formatPercentage(change)}
          </span>
        )}
      </div>
    </BaseStatCard>
  );
}

interface CountStatCardProps {
  title: string;
  value: number;
  unit?: string;
  change?: number;
  className?: string;
}

export function CountStatCard({
  title,
  value,
  unit = "",
  change,
  className,
}: CountStatCardProps) {
  return (
    <BaseStatCard title={title} className={className}>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          {value.toLocaleString()}
          {unit}
        </span>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {formatPercentage(change)}
          </span>
        )}
      </div>
    </BaseStatCard>
  );
}

interface TrendStatCardProps {
  title: string;
  value: string | number;
  trend: "up" | "down" | "neutral";
  trendValue?: number;
  className?: string;
}

export function TrendStatCard({
  title,
  value,
  trend,
  trendValue,
  className,
}: TrendStatCardProps) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <BaseStatCard title={title} className={className}>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        <div
          className={`flex items-center space-x-1 text-sm font-medium ${trendColors[trend]}`}
        >
          <span>{trendIcons[trend]}</span>
          {trendValue && <span>{formatPercentage(trendValue)}</span>}
        </div>
      </div>
    </BaseStatCard>
  );
}
