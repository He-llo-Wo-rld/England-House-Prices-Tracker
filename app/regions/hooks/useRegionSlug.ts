import { useEffect, useState } from "react";
import { RegionDetail } from "@/types/regions";

export function useRegionSlug(slug: string | string[]) {
  const [region, setRegion] = useState<RegionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/regions?region=${slug}`);
        const data = await response.json();

        if (response.ok && data) {
          setRegion(data);
          setError(null);
        } else {
          setError("Region not found");
        }
      } catch {
        setError("Failed to load region data");
      } finally {
        setLoading(false);
      }
    };

    fetchRegion();
  }, [slug]);

  return { region, loading, error };
}