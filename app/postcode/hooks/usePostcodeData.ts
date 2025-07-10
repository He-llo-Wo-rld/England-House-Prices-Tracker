import { useEffect, useState } from "react";
import { PostcodeData } from "@/types/postcode";

export function usePostcodeData(postcode: string) {
  const [data, setData] = useState<PostcodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { data, loading, error };
}