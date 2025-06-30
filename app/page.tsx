import { NationalStats } from "@/components/features/dashboard/NationalStats";
import { RegionsGrid } from "@/components/features/dashboard/RegionsGrid";
import { TrendingAreas } from "@/components/features/dashboard/TrendingAreas";
import { SearchBar } from "@/components/features/search/SearchBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                UK House Prices
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Search
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Regions
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Calculator
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Real-time UK House Price
                <span className="block text-blue-600">Tracker</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                Get instant access to current house prices, market trends, and
                affordability insights across the UK. Make informed property
                decisions with live data.
              </p>

              {/* API-Connected Search Bar */}
              <SearchBar />
            </div>
          </div>
        </section>

        {/* API-Connected National Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                UK Market Overview
              </h3>
              <p className="text-gray-600">
                Latest statistics from HM Land Registry
              </p>
            </div>

            <NationalStats />
          </div>
        </section>

        {/* API-Connected Regions Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                England Property Market
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real-time house price data across England's 9 regions. Track weekly property sales, market trends, and regional price changes with live data from the last 7 days.
              </p>
            </div>

            <RegionsGrid />
          </div>
        </section>

        {/* API-Connected Trending Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                🔥 Trending Areas
              </h3>
              <p className="text-xl text-gray-600">
                Areas with the biggest price movements this month
              </p>
            </div>

            <TrendingAreas />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Stay Ahead of the Market
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Get personalized alerts when prices change in your area of
              interest
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Set Price Alert
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Calculate Affordability
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Data sourced from HM Land Registry. Updated monthly.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 UK House Prices Tracker. Built for portfolio demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
}
