"use client";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { formatDate, formatPrice, formatPriceChange } from "@/utils/formatters";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RegionDetail {
  id: string;
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  description: string;
  lastUpdated: string;
  propertyTypes: {
    detached: { price: number };
    semi: { price: number };
    terraced: { price: number };
    flat: { price: number };
  };
}

export default function RegionPage() {
  const params = useParams();
  const [region, setRegion] = useState<RegionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      if (!params.slug) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/regions?region=${params.slug}`);
        const data = await response.json();

        if (response.ok && data) {
          setRegion(data);
          setError(null);
        } else {
          setError("Region not found");
        }
      } catch (err) {
        setError("Failed to load region data");
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading region data...</p>
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

  if (!region) return null;

  const priceChange = formatPriceChange(region.priceChange);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {region.name}
          </h1>
          <p className="text-xl text-gray-600">
            Regional Property Market Analysis
          </p>
        </div>

        {/* Main Stats */}
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

        {/* Property Types */}
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

        {/* Market Summary */}
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
      </div>

      <Footer />
    </div>
  );
}
