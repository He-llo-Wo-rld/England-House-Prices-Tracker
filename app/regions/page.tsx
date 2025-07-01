"use client";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { formatPrice, formatPriceChange } from "@/utils/formatters";
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

export default function RegionsPage() {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading regions...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ England Regions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore educational property market demo across England&apos;s
            regions. Click on any region to view demo analysis and interface
            patterns.
          </p>
        </div>

        {/* Regions Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => {
              const priceChange = formatPriceChange(region.priceChange);

              return (
                <Link
                  key={region.id}
                  href={`/regions/${region.slug}`}
                  className="block group"
                >
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
                    <p className="text-gray-600 text-sm mb-4">
                      {region.description}
                    </p>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {formatPrice(region.averagePrice)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Average house price
                      </div>
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
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
