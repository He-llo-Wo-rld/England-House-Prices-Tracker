"use client";

import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PostcodeData {
  postcode: string;
  region: string;
  coordinates: { lat: number; lng: number } | null;
  statistics: {
    averagePrice: number;
    medianPrice: number;
    minPrice: number;
    maxPrice: number;
    totalSales: number;
    priceRange: string;
    regionAverage: number;
    vsRegion: number;
  };
  propertyTypes: Record<string, number>;
  recentSales: Array<{
    id: string;
    price: number;
    propertyType: string;
    dateSold: string;
    coordinates: { lat: number; lng: number } | null;
  }>;
  lastUpdated: string;
}

export default function PostcodePage({
  params,
}: {
  params: { postcode: string };
}) {
  const [data, setData] = useState<PostcodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const postcode = decodeURIComponent(params.postcode);

  useEffect(() => {
    const fetchPostcodeData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(postcode)}`
        );
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Postcode not found");
        }
      } catch (err) {
    
        setError("Failed to load postcode data");
      } finally {
        setLoading(false);
      }
    };

    fetchPostcodeData();
  }, [postcode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading postcode data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">📮</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Postcode Not Found
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">Try:</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Different postcode format (e.g., SW1A 1AA)</li>
              <li>• Checking if the postcode exists</li>
              <li>• Searching for a nearby area</li>
            </ul>
          </div>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {data.postcode}
              </h1>
              <p className="text-gray-600">{data.region}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(data.statistics.averagePrice)}
            </p>
            <p className="text-sm text-gray-600">
              {data.statistics.vsRegion > 0 ? "+" : ""}
              {data.statistics.vsRegion}% vs region avg
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
            <p className="text-2xl font-bold text-gray-900">
              {data.statistics.priceRange}
            </p>
            <p className="text-sm text-gray-600">Min to max</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-gray-900">
              {data.statistics.totalSales}
            </p>
            <p className="text-sm text-gray-600">Properties sold</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Median Price</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(data.statistics.medianPrice)}
            </p>
            <p className="text-sm text-gray-600">Middle value</p>
          </div>
        </div>

        {/* Property Types */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Property Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.propertyTypes).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{count}</p>
                <p className="text-sm text-gray-600 capitalize">
                  {type.replace("_", " ").toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Sales</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date Sold
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.recentSales.map((sale, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(sale.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {sale.propertyType.replace("_", " ").toLowerCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.dateSold).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
