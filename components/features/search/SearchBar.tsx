"use client";

import { searchApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SearchResult {
  id: string;
  name: string;
  type: "postcode" | "region" | "property";
  description: string;
  averagePrice?: number;
  price?: number;
  coordinates?: { lat: number; lng: number };
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      const response = await searchApi.search(searchQuery, { limit: 8 });

      if (response.success && response.data) {
        setResults(response.data);
        setShowResults(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectResult(results[selectedIndex]);
        } else if (results.length > 0) {
          selectResult(results[0]);
        }
        break;
      case "Escape":
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const selectResult = (result: SearchResult) => {
    setQuery(result.name);
    setShowResults(false);
    setSelectedIndex(-1);

    // Navigate based on type
    if (result.type === "postcode") {
      window.location.href = `/postcode/${encodeURIComponent(result.name)}`;
    } else if (result.type === "region") {
      window.location.href = `/region/${encodeURIComponent(
        result.name.toLowerCase()
      )}`;
    } else if (result.type === "property") {
      window.location.href = `/property/${result.id}`;
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "postcode":
        return "📍";
      case "region":
        return "🏙️";
      case "property":
        return "🏠";
      default:
        return "📍";
    }
  };

  const getResultPrice = (result: SearchResult) => {
    if (result.price) {
      return formatPrice(result.price);
    } else if (result.averagePrice) {
      return `Avg ${formatPrice(result.averagePrice)}`;
    }
    return null;
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
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
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter postcode (SW1A 1AA) or region (London, Manchester...)"
          className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setShowResults(true);
          }}
        />

        <button
          className="absolute inset-y-0 right-0 px-8 bg-blue-600 text-white rounded-r-2xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
          onClick={() => {
            if (query.trim()) {
              performSearch(query);
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                    index === selectedIndex ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => selectResult(result)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {getResultIcon(result.type)}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {result.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.description}
                        </div>
                      </div>
                    </div>
                    {getResultPrice(result) && (
                      <div className="text-sm font-medium text-blue-600">
                        {getResultPrice(result)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center">
                Press ↑↓ to navigate • Enter to select • Esc to close
              </div>
            </>
          ) : query.trim().length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}

      {/* Popular searches */}
      {!showResults && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-gray-500">Popular:</span>
          {["SW1A 1AA", "London", "Manchester", "Birmingham", "M1 1AA"].map(
            (term) => (
              <button
                key={term}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
                onClick={() => {
                  setQuery(term);
                  performSearch(term);
                }}
              >
                {term}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
