export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🏠 PropertyMarket</h3>
            <p className="text-gray-400">
              Educational demo application showcasing property market interface
              and data visualization patterns.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/regions"
                  className="hover:text-white transition-colors"
                >
                  All Regions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Search Properties
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Regions</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/regions/london"
                  className="hover:text-white transition-colors"
                >
                  London
                </a>
              </li>
              <li>
                <a
                  href="/regions/manchester"
                  className="hover:text-white transition-colors"
                >
                  Manchester
                </a>
              </li>
              <li>
                <a
                  href="/regions/birmingham"
                  className="hover:text-white transition-colors"
                >
                  Birmingham
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Demo Information</h4>
            <div className="text-gray-400 text-sm space-y-2">
              <p>
                <span className="inline-block w-3 h-3 bg-amber-400 rounded-full mr-2"></span>
                Educational purposes only
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                Realistic market patterns
              </p>
              <p>
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                Auto-refreshing demo data
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Not for commercial property decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 PropertyMarket. Educational demo application.
          </p>
          <p className="text-gray-500 text-xs">
            Demo data • Updated automatically • Learning purposes only
          </p>
        </div>
      </div>
    </footer>
  );
}
