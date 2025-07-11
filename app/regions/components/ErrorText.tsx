import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

export const ErrorText = ({ error }: { error: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
