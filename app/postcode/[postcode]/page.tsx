"use client";

import { PostcodePageProps } from "@/types/postcode";
import {
  Header,
  Loading,
  PostcodeNotFound,
  PropertyTypes,
  RecentSales,
  Statistics,
} from "../components";
import { usePostcodeData } from "../hooks/usePostcodeData";

export default function PostcodePage({ params }: PostcodePageProps) {
  const postcode = decodeURIComponent(params.postcode);
  const { data, loading, error } = usePostcodeData(postcode);

  if (loading) return <Loading />;

  if (error || !data) {
    return <PostcodeNotFound error={error || "Postcode not found"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header data={data} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Statistics data={data} />

        <PropertyTypes data={data} />

        <RecentSales data={data} />

        <p className="text-center text-gray-500 text-sm mt-8">
          Last updated: {new Date(data.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
