import { Region } from "@/types/regions";
import { formatPrice } from "@/utils/formatters";

export const RegionSummaryCard = ({
  region,
  priceChange,
}: {
  region: Region;
  priceChange: { color: string; symbol: string; formatted: string };
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full transition-all duration-200 group-hover:shadow-xl group-hover:scale-105">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-blue-600 group-hover:text-blue-700">
          {region.name}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${priceChange.color} bg-opacity-10`}
        >
          {priceChange.symbol} {priceChange.formatted}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{region.description}</p>

      {/* Price */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatPrice(region.averagePrice)}
        </div>
        <div className="text-sm text-gray-500">Average house price</div>
      </div>

      {/* Sales Count */}
      <div className="mb-6">
        <div className="text-lg font-semibold text-gray-700">
          {region.salesCount.toLocaleString()} properties sold
        </div>
      </div>

      {/* View Details Button */}
      <div className="mt-auto">
        <div className="w-full bg-blue-600 text-white text-center py-3 rounded-xl font-medium group-hover:bg-blue-700 transition-colors">
          View Details
        </div>
      </div>
    </div>
  );
};
