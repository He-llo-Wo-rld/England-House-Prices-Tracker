"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trendingApi } from "@/lib/api";
import { formatPrice, formatPriceChange } from "@/lib/utils";
import { TrendingArea } from "@/types/api";
import { useEffect, useState } from "react";

export function TrendingAreas() {
  const [trendingAreas, setTrendingAreas] = useState<TrendingArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingAreas = async () => {
      try {
        setLoading(true);
        const response = await trendingApi.getTrending({ limit: 4 });

        if (response.success && response.data) {
          setTrendingAreas(response.data);
        } else {
          throw new Error(response.error || "Failed to fetch trending areas");
        }
      } catch (err) {
        console.error("Error fetching trending areas:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // Fallback to mock data
        setTrendingAreas([
          {
            id: "1",
            name: "Brighton & Hove",
            region: "South East",
            priceChange: 18.2,
            averagePrice: 420000,
            reason: "Tech workers from London",
            salesVolume: 145,
            marketCap: "medium",
            trend: "strongly_increasing",
            coordinates: { lat: 50.8225, lng: -0.1372 },
          },
          {
            id: "2",
            name: "Salford",
            region: "Greater Manchester",
            priceChange: 16.8,
            averagePrice: 195000,
            reason: "MediaCity regeneration",
            salesVolume: 89,
            marketCap: "small",
            trend: "increasing",
            coordinates: { lat: 53.4875, lng: -2.2901 },
          },
          {
            id: "3",
            name: "Cardiff Bay",
            region: "Wales",
            priceChange: 15.4,
            averagePrice: 285000,
            reason: "Waterfront development",
            salesVolume: 112,
            marketCap: "medium",
            trend: "increasing",
            coordinates: { lat: 51.4647, lng: -3.1636 },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAreas();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">
          Error Loading Trending Areas
        </h3>
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (trendingAreas.length === 0) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-600">No trending areas found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top trending card */}
      {trendingAreas[0] && (
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="text-lg">🔥</div>
              <CardTitle className="text-lg text-orange-800">
                Hottest: {trendingAreas[0].name}
              </CardTitle>
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                +{trendingAreas[0].priceChange}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-xs text-orange-700">Price</p>
                <p className="font-bold text-orange-900">
                  {formatPrice(trendingAreas[0].averagePrice)}
                </p>
              </div>
              <div>
                <p className="text-xs text-orange-700">Region</p>
                <p className="font-semibold text-orange-900">
                  {trendingAreas[0].region}
                </p>
              </div>
              <div>
                <p className="text-xs text-orange-700">Driver</p>
                <p className="font-medium text-orange-900 text-xs">
                  {trendingAreas[0].reason}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other trending areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {trendingAreas.slice(1).map((area, index) => {
          const priceChange = formatPriceChange(area.priceChange);

          return (
            <Card key={area.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-base">{area.name}</h3>
                    <p className="text-xs text-gray-600">{area.region}</p>
                    <p className="text-xs text-blue-600">
                      {area.salesVolume} sales • {area.marketCap} market
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">#{index + 2}</span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 text-xs"
                    >
                      {priceChange.symbol} {priceChange.formatted}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Price</span>
                    <span className="font-semibold text-sm">
                      {formatPrice(area.averagePrice)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Driver</p>
                    <p className="text-xs font-medium">{area.reason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4 text-center">
          <h3 className="text-base font-semibold text-blue-900 mb-1">
            Want to track your area?
          </h3>
          <p className="text-blue-700 mb-3 text-sm">
            Set up price alerts and get notified when your area trends
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
            Set Price Alert
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
