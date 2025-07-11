"use client";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { formatPriceChange } from "@/utils/formatters";
import Link from "next/link";
import {
  ErrorText,
  Header,
  LoadingRegions,
  RegionSummaryCard,
  StatsSummary,
} from "./components";
import { useRegionsData } from "./hooks/useRegionsData";

export default function RegionsPage() {
  const { regions, loading, error } = useRegionsData();

  if (loading) return <LoadingRegions />;

  if (error) return <ErrorText error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => {
              const priceChange = formatPriceChange(region.priceChange);

              return (
                <Link
                  key={region.id}
                  href={`/regions/${region.slug}`}
                  className="block group"
                >
                  <RegionSummaryCard
                    region={region}
                    priceChange={priceChange}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <StatsSummary regions={regions} />
      </div>

      <Footer />
    </div>
  );
}
