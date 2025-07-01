import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  color,
  className = "",
}: StatCardProps) {
  const colorClasses = {
    green: "border-green-200 bg-green-50",
    purple: "border-purple-200 bg-purple-50",
    red: "border-red-200 bg-red-50",
    blue: "border-blue-200 bg-blue-50",
  };

  const textColors = {
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
    blue: "text-blue-600",
  };

  const cardClass = color
    ? colorClasses[color as keyof typeof colorClasses] || ""
    : "";
  const valueColor = color
    ? textColors[color as keyof typeof textColors] || "text-gray-900"
    : "text-gray-900";

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${cardClass} ${className}`}
    >
      <CardContent className="p-4 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
        <div className={`text-2xl font-bold mb-1 ${valueColor}`}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}
