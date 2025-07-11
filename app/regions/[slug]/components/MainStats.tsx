import { RegionDetail } from "@/types/regions";
import { formatDate, formatPrice, formatPriceChange } from "@/utils/formatters";

export const MainStats = ({ region }: { region: RegionDetail }) => {
    const priceChange = formatPriceChange(region.priceChange);
  return (
    <div className="max-w-6xl mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Average Price */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Average Price
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(region.averagePrice)}
                    </div>
                    <div
                      className={`inline-flex items-center ${priceChange.color}`}
                    >
                      <span className="mr-1">{priceChange.symbol}</span>
                      <span>{priceChange.formatted}</span>
                    </div>
                  </div>
    
                  {/* Properties Sold */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Properties Sold
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {region.salesCount.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Total sales recorded</div>
                  </div>
    
                  {/* Last Updated */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Last Updated
                    </h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {formatDate(region.lastUpdated)}
                    </div>
                    <div className="text-gray-600">Latest data</div>
                  </div>
                </div>
              </div>
            </div>
  );
}