"use client";

import { NationalStats } from "@/components/features/dashboard/NationalStats";
import { RegionsGrid } from "@/components/features/dashboard/RegionsGrid";
import { Footer, Navigation } from "@/components/layout";
import { ErrorText, SearchBox, SearchResults } from "@/components/shared";
import { useSearchResults } from "@/hooks/useSearchResults";
import { useState } from "react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const popularSearches = ["LS18", "M1", "SW1", "SE1", "RG1", "BS1", "B1"];

  const {
    results,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    handleSearch,
    itemsPerPage,
  } = useSearchResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          handleSearch={handleSearch}
          popularSearches={popularSearches}
        />

        {error && <ErrorText error={error} />}

        {results?.properties && (
          <SearchResults
            results={results}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
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
