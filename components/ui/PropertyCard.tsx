import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  postcode: string;
  price: number;
  propertyType: string;
  dateSold: string;
  region?: string;
  className?: string;
}

export function PropertyCard({
  postcode,
  price,
  propertyType,
  dateSold,
  region,
  className = "",
}: PropertyCardProps) {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{postcode}</h3>
          <span className="text-xs text-gray-500">{propertyType}</span>
        </div>
        <div className="text-lg font-bold text-blue-600 mb-1">
          {formatPrice(price)}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(dateSold).toLocaleDateString("en-GB")}
        </div>
        {region && <div className="text-xs text-gray-400 mt-1">{region}</div>}
      </CardContent>
    </Card>
  );
}
