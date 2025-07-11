import { RegionDetail } from "@/types/regions";
import { formatPriceChange } from "@/utils/formatters";

export const MarketSummary = ({ region }: { region: RegionDetail }) => {
  const priceChange = formatPriceChange(region.priceChange);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          📊 Market Summary
        </h2>
        <div className="text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {region.description}
          </p>
          <div className="inline-flex items-center justify-center bg-blue-50 px-6 py-3 rounded-xl">
            <span className="text-blue-700 font-medium">
              Current market trend:
              <span className={`ml-2 ${priceChange.color}`}>
                {priceChange.symbol} {priceChange.formatted} YoY
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
