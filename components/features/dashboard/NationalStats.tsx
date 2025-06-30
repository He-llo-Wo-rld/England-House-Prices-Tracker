"use client";

import { statsApi } from "@/lib/api";
import { formatPrice, formatPriceChange } from "@/lib/utils";
import { NationalStats as NationalStatsType } from "@/types/api";
import { useEffect, useState } from "react";

export function NationalStats() {
  const [stats, setStats] = useState<NationalStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNationalStats = async () => {
      try {
        setLoading(true);
        const response = await statsApi.getNational();

        if (response.success && response.data) {
          setStats(response.data);
        } else {
          throw new Error(
            response.error || "Failed to fetch national statistics"
          );
        }
      } catch (err) {
        console.error("Error fetching national stats:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // Fallback to mock data
        setStats({
          averagePrice: 325000,
          priceChangeYoY: 12.4,
          priceChangeMoM: 2.1,
          totalSales: 8847,
          lastUpdated: new Date().toISOString(),
          topPerformer: {
            name: "Brighton & Hove",
            region: "South East",
            change: 18.2,
          },
          dataSource: "HM Land Registry",
          marketTrend: "increasing",
          averagePriceByType: {
            detached: 485000,
            semi: 345000,
            terraced: 275000,
            flat: 235000,
          },
          regionalBreakdown: {
            london: { averagePrice: 687000, change: 8.4 },
            southeast: { averagePrice: 420000, change: 9.2 },
            southwest: { averagePrice: 385000, change: 7.8 },
            northwest: { averagePrice: 235000, change: 13.1 },
            northeast: { averagePrice: 185000, change: 11.4 },
            midlands: { averagePrice: 245000, change: 12.1 },
            wales: { averagePrice: 215000, change: 10.8 },
            scotland: { averagePrice: 195000, change: 9.7 },
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNationalStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">
          Error Loading Statistics
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

  if (!stats) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <p className="text-gray-600">No statistics available</p>
      </div>
    );
  }

  const priceChange = formatPriceChange(stats.priceChangeYoY);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Average Price */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">
              National Average
            </p>
            <p
              className="text-xl font-bold text-gray-900"
              suppressHydrationWarning
            >
              {formatPrice(stats.averagePrice)}
            </p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Year on Year Change */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">YoY Change</p>
            <p
              className={`text-xl font-bold flex items-center gap-1 ${priceChange.color}`}
              suppressHydrationWarning
            >
              {priceChange.symbol} {priceChange.formatted}
            </p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Top Performing */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Top Performer</p>
            <p className="text-sm font-bold text-gray-900">
              {stats.topPerformer.name}
            </p>
            <p
              className="text-xs text-green-600 font-medium"
              suppressHydrationWarning
            >
              +{stats.topPerformer.change}%
            </p>
          </div>
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">Last Updated</p>
            <p className="text-sm font-bold text-gray-900">
              {new Date(stats.lastUpdated).toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-gray-500">{stats.dataSource}</p>
          </div>
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
