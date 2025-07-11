import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

export const LoadingRegions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading regions...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
