"use client";

import { NationalStats } from "@/components/features/dashboard/NationalStats";
import { RegionsGrid } from "@/components/features/dashboard/RegionsGrid";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SearchTag } from "@/components/ui/SearchTag";
import { StatCard } from "@/components/ui/StatCard";
import { searchApi } from "@/lib/api";
import { useState } from "react";

export default function HomePage() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const popularSearches = [
    "LS18",
    "London",
    "M1",
    "Birmingham",
    "Manchester",
    "Leeds",
  ];

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchApi.search(term, 8);

      if (result.success && result.data?.properties?.length > 0) {
        setResults(result.data);
        setError(null);
      } else {
        setError(
          `No properties found for "${term}". Try: London, M1, Birmingham`
        );
        setResults(null);
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            England Property Market
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Educational demo of property market interface across England
            regions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }}
              className="flex gap-3 mb-4"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by postcode or region..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
              />
              <Button
                disabled={isLoading}
                className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </form>

            <div className="flex gap-2 justify-center items-center">
              <span className="text-xs text-gray-500">Try:</span>
              {popularSearches.map((term) => (
                <SearchTag
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    handleSearch(term);
                  }}
                >
                  {term}
                </SearchTag>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-red-600 text-sm font-medium mb-1">
                Search not found
              </div>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {results?.properties && (
          <div className="max-w-7xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 text-gray-800 p-4">
                <h2 className="text-xl font-semibold">Search Results</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Found {results.properties.length} properties
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                  {results.properties.slice(0, 12).map((property: any) => (
                    <PropertyCard
                      key={property.id}
                      postcode={property.postcode}
                      price={property.price}
                      propertyType={property.propertyType}
                      region={property.region}
                      dateSold={property.dateSold}
                    />
                  ))}
                </div>

                {results.statistics && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      📊 Search Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard
                        title="Found"
                        value={results.statistics.totalFound}
                      />
                      <StatCard
                        title="Average"
                        value={`£${results.statistics.averagePrice?.toLocaleString()}`}
                        color="green"
                      />
                      <StatCard
                        title="Min"
                        value={`£${results.statistics.minPrice?.toLocaleString()}`}
                        color="purple"
                      />
                      <StatCard
                        title="Max"
                        value={`£${results.statistics.maxPrice?.toLocaleString()}`}
                        color="red"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              📈 UK Market Overview
            </h2>
            <p className="text-xl text-gray-600">
              Real-time national statistics from all regions
            </p>
          </div>
          <NationalStats />
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              🗺️ Regional Data
            </h2>
            <p className="text-xl text-gray-600">
              Explore property prices across England&apos;s 9 regions
            </p>
          </div>
          <RegionsGrid />
        </div>
      </div>

      <Footer />
    </div>
  );
}
