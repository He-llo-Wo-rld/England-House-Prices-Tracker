import { RegionDetail } from "@/types/regions";
import { formatPrice } from "@/utils/formatters";

export const PropertyTypes = ({ region }: { region: RegionDetail }) => {
  return (
    <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Property Types Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(region.propertyTypes).map(([type, data]) => (
                  <div key={type} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold capitalize mb-3">
                      {type === "semi" ? "Semi-Detached" : type}
                    </h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {formatPrice(data.price)}
                    </div>
                    <div className="text-sm text-gray-500">Average price</div>
                  </div>
                ))}
              </div>
            </div>
  );
}