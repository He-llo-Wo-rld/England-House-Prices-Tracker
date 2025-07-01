interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-lg transition-colors duration-200";

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const baseClasses = "bg-white rounded-lg shadow-lg border border-gray-100";
  const hoverClasses = hover
    ? "hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: "blue" | "green" | "purple" | "red" | "yellow";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <Card className="p-6 text-center">
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className={`text-3xl font-bold mb-2 ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-gray-600">{title}</div>
      {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
    </Card>
  );
}

interface PropertyCardProps {
  postcode: string;
  price: number;
  propertyType: string;
  region?: string;
  dateSold?: string;
}

export function PropertyCard({
  postcode,
  price,
  propertyType,
  region,
  dateSold,
}: PropertyCardProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-blue-600">{postcode}</span>
        <span className="text-sm text-gray-500">{propertyType}</span>
      </div>
      <div className="text-2xl font-bold text-green-600 mb-2">
        £{price?.toLocaleString()}
      </div>
      <div className="text-sm text-gray-500">
        {region && <div>Region: {region}</div>}
        {dateSold && <div>Sold: {new Date(dateSold).toLocaleDateString()}</div>}
      </div>
    </Card>
  );
}

interface SearchTagProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function SearchTag({ children, onClick }: SearchTagProps) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      className="rounded-full"
    >
      {children}
    </Button>
  );
}
