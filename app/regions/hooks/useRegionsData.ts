import { useEffect, useState } from "react";
import { Region } from "@/types/regions";

export function useRegionsData() {
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
      } catch {
        setError("Failed to fetch regions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, loading, error };
}