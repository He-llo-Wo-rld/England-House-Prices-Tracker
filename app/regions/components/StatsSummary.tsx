
import { formatPrice } from "@/utils/formatters"
import { Region } from "@/types/regions";

export const StatsSummary = ({ regions }: { regions: Region[] }) => {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          📊 England Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {regions.length}
                </div>
                <div className="text-gray-600">Regions Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {regions
                    .reduce((sum, region) => sum + region.salesCount, 0)
                    .toLocaleString()}
                </div>
                <div className="text-gray-600">Total Properties</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(
                    Math.round(
                      regions.reduce(
                        (sum, region) => sum + region.averagePrice,
                        0
                      ) / regions.length
                    )
                  )}
                </div>
                <div className="text-gray-600">National Average</div>
              </div>
            </div>
          </div>
        </div>)}