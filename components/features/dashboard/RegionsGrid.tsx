"use client";

import Link from "next/link";
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
        const response = await fetch("/api/regions");
        const data = await response.json();

        if (data.success && data.regions) {
          setRegions(data.regions);
          setError(null);
        } else {
          setError("Failed to load regions data");
        }
      } catch (err) {
        setError("Failed to fetch regions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading regions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Link
            key={region.id}
            href={`/regions/${region.slug}`}
            className="block group"
          >
            <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 group-hover:shadow-xl group-hover:scale-105">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-blue-600 group-hover:text-blue-700">
                  {region.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    region.priceChange >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {region.priceChange >= 0 ? "↗" : "↘"}{" "}
                  {Math.abs(region.priceChange).toFixed(1)}%
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{region.description}</p>

              <div className="space-y-2">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    £{(region.averagePrice / 1000).toFixed(0)}k
                  </span>
                  <span className="text-sm text-gray-500 ml-2">avg price</span>
                </div>
                <div className="text-sm text-gray-600">
                  {region.salesCount.toLocaleString()} properties sold
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-blue-600 font-medium group-hover:text-blue-700">
                  View Details →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
