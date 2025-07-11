"use client";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { useParams } from "next/navigation";
import { ErrorText, LoadingRegions } from "../components";
import { useRegionSlug } from "../hooks/useRegionSlug";
import { Header, MainStats, MarketSummary, PropertyTypes } from "./components";

export default function RegionPage() {
  const params = useParams();
  const { region, loading, error } = useRegionSlug(params.slug);

  if (loading) return <LoadingRegions />;
  if (error) return <ErrorText error={error} />;
  if (!region) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Header region={region} />

        <MainStats region={region} />

        <PropertyTypes region={region} />

        <MarketSummary region={region} />
      </div>

      <Footer />
    </div>
  );
}
