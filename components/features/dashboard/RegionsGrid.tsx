"use client";

import { regionsApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Region {
  id: string;
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  description: string;
  lastUpdated: string;
}

export function RegionsGrid() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        setLoading(true);
        console.log("🔥 Fetching regions from API...");

        const response = await regionsApi.getAll();
        console.log("📊 Regions response:", response);

        if (response.regions) {
          setRegions(response.regions);
        } else {
          throw new Error("No regions data received");
        }
      } catch (err) {
        console.error("❌ Error fetching regions:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // Fallback to mock data
        setRegions([
          {
            id: "1",
            name: "London",
            slug: "london",
            averagePrice: 687000,
            priceChange: 8.4,
            salesCount: 2847,
            description: "2,847 properties sold",
            lastUpdated: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Manchester",
            slug: "manchester",
            averagePrice: 285000,
            priceChange: 15.2,
            salesCount: 1240,
            description: "1,240 properties sold",
            lastUpdated: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Birmingham",
            slug: "birmingham",
            averagePrice: 245000,
            priceChange: 12.1,
            salesCount: 980,
            description: "980 properties sold",
            lastUpdated: new Date().toISOString(),
          },
          {
            id: "4",
            name: "Bristol",
            slug: "bristol",
            averagePrice: 420000,
            priceChange: 6.8,
            salesCount: 650,
            description: "650 properties sold",
            lastUpdated: new Date().toISOString(),
          },
          {
            id: "5",
            name: "Leeds",
            slug: "leeds",
            averagePrice: 220000,
            priceChange: 11.5,
            salesCount: 780,
            description: "780 properties sold",
            lastUpdated: new Date().toISOString(),
          },
          {
            id: "6",
            name: "Liverpool",
            slug: "liverpool",
            averagePrice: 185000,
            priceChange: 14.3,
            salesCount: 920,
            description: "920 properties sold",
            lastUpdated: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
              </div>
              <div className="mt-6 h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error && regions.length === 0) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">
          Error Loading Regions
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {regions.map((region) => (
        <div
          key={region.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {region.name}
                </h4>
                <p className="text-sm text-gray-500">{region.description}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  region.priceChange > 10
                    ? "bg-green-100 text-green-800"
                    : region.priceChange > 5
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                +{region.priceChange.toFixed(1)}%
              </div>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {formatPrice(region.averagePrice)}
              </p>
              <p className="text-sm text-gray-500">Average house price</p>
            </div>

            <button
              className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors duration-200 font-semibold"
              onClick={() => {
                window.location.href = `/region/${region.slug}`;
              }}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
