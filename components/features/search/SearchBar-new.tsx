"use client";

import { searchApi } from "@/lib/api";
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

      const response = await searchApi.search(searchQuery, 8);

      if (response.success && response.data) {
        setResults(response.data);
        setIsOpen(true);
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
      // Navigate to region page
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
    <div className="w-full max-w-lg mx-auto" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search by postcode or region..."
            className="w-full px-4 py-2.5 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />

          {/* Search Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <svg
                className="w-4 h-4 text-gray-400"
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
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-50 max-h-80 overflow-y-auto">
            {error ? (
              <div className="p-4 text-red-600 text-center text-sm">
                <p>{error}</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-1">
                {results.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 text-sm">
                            {result.name}
                          </span>
                          <span className="px-1 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                            {result.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {result.description}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="text-right ml-2">
                        {result.averagePrice && (
                          <p className="font-medium text-gray-900 text-sm">
                            {formatPrice(result.averagePrice)}
                          </p>
                        )}
                        {result.price && (
                          <p className="font-medium text-gray-900 text-sm">
                            {formatPrice(result.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="p-4 text-gray-500 text-center text-sm">
                  <p>No results found for "{query}"</p>
                </div>
              )
            )}
          </div>
        )}
      </form>

      {/* Quick suggestions */}
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-500 mr-2">Try:</span>
        {["London", "Manchester", "SW1", "M1"].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleInputChange(suggestion)}
            className="px-2 py-1 mx-1 bg-gray-100 rounded text-xs text-gray-600 hover:bg-gray-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
