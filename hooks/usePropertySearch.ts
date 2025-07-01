// Custom hook for search functionality
import { searchApi } from "@/lib/api";
import { useCallback, useState } from "react";

export function usePropertySearch() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (term: string) => {
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
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    handleSearch,
    clearResults,
  };
}
