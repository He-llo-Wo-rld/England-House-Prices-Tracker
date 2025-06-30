"use client";

import { search } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SearchResult {
  id: string;
  name: string;
  type: "region" | "postcode" | "property";
  description: string;
  averagePrice?: number;
  price?: number;
  priceChange?: number;
  salesCount?: number;
  propertyCount?: number;
  region?: string;
  coordinates?: { lat: number; lng: number };
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log("🔍 Performing search for:", searchQuery);
      const response = await search(searchQuery, 8);

      if (response.success && response.data) {
        setResults(response.data);
        setIsOpen(true);
        console.log("✅ Search results:", response.data);
      } else {
        setResults([]);
        setError("No results found");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log("🎯 Result clicked:", result);

    if (result.type === "postcode") {
      // Navigate to postcode detail page
      window.location.href = `/postcode/${encodeURIComponent(result.name)}`;
    } else if (result.type === "region") {
      // Navigate to region page (for future implementation)
      window.location.href = `/region/${result.name.toLowerCase()}`;
    } else {
      // Handle other types
      console.log("Selected result:", result);
    }

    // Close search
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search by postcode, region, or area (e.g., LS1, London, Manchester)"
            className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white shadow-lg"
          />

          {/* Search Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Search Results Dropdown */}
        {isOpen && query.length >= 2 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
            {error ? (
              <div className="p-4 text-red-600 text-center">
                <p>{error}</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">
                            {result.name}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              result.type === "region"
                                ? "bg-blue-100 text-blue-800"
                                : result.type === "postcode"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {result.description}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="text-right ml-4">
                        {result.averagePrice && (
                          <p className="font-semibold text-gray-900">
                            {formatPrice(result.averagePrice)}
                          </p>
                        )}
                        {result.price && (
                          <p className="font-semibold text-gray-900">
                            {formatPrice(result.price)}
                          </p>
                        )}
                        {result.priceChange && (
                          <p
                            className={`text-sm ${
                              result.priceChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {result.priceChange > 0 ? "+" : ""}
                            {result.priceChange.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="p-4 text-gray-500 text-center">
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">
                    Try searching for a postcode like "LS1" or region like
                    "London"
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="mt-4 w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? "Searching..." : "Search Properties"}
        </button>
      </form>

      {/* Quick suggestions */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["London", "Manchester", "LS1", "M1", "SW1", "Birmingham"].map(
            (suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleInputChange(suggestion)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
