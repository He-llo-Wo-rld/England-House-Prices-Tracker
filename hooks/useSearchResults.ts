import { useState } from "react";
import { searchApi } from "@/lib/api";

export function useSearchResults(itemsPerPage = 12) {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentPage(1);

    try {
      const result = await searchApi.search(term, 200);

      if (result.success && result.data?.properties?.length > 0) {
        setResults(result.data);
        setError(null);
      } else {
        setError(
          `No properties found for "${term}". Try: London, M1, Birmingham`
        );
        setResults(null);
      }
    } catch {
      setError("Search failed. Please try again.");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    handleSearch,
    itemsPerPage,
  };
}