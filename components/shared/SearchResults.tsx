import { PropertyCard, StatCard } from "@/components/ui";

type Props = {
  results: any;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const SearchResults = ({
  results,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  if (!results?.properties) return null;

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-100 text-gray-800 p-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-gray-600 text-sm mt-1">
            Found {results.properties.length} properties
            {results.properties.length > itemsPerPage && (
              <span className="ml-1">
                (showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  results.properties.length
                )}
                -
                {Math.min(
                  currentPage * itemsPerPage,
                  results.properties.length
                )}
                )
              </span>
            )}
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {results.properties
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((property: any) => (
                <PropertyCard
                  key={property.id}
                  postcode={property.postcode}
                  price={property.price}
                  propertyType={property.propertyType}
                  region={property.region}
                  dateSold={property.dateSold}
                />
              ))}
          </div>

          {/* Pagination Controls */}
          {results.properties.length > itemsPerPage && (
            <div className="flex items-center justify-between border-t pt-6">
              <div className="text-sm text-gray-500">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * itemsPerPage + 1,
                  results.properties.length
                )}{" "}
                to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  results.properties.length
                )}{" "}
                of {results.properties.length} results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <div className="flex space-x-1">
                  {Array.from(
                    {
                      length: Math.ceil(
                        results.properties.length / itemsPerPage
                      ),
                    },
                    (_, i) => i + 1
                  )
                    .filter((page) => {
                      const totalPages = Math.ceil(
                        results.properties.length / itemsPerPage
                      );
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (page >= currentPage - 1 && page <= currentPage + 1)
                        return true;
                      return false;
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 rounded text-sm ${
                            currentPage === page
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(results.properties.length / itemsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(results.properties.length / itemsPerPage)
                  }
                  className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {results.statistics && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                📊 Search Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Found" value={results.statistics.totalFound} />
                <StatCard
                  title="Average"
                  value={`£${results.statistics.averagePrice?.toLocaleString()}`}
                  color="green"
                />
                <StatCard
                  title="Min"
                  value={`£${results.statistics.minPrice?.toLocaleString()}`}
                  color="purple"
                />
                <StatCard
                  title="Max"
                  value={`£${results.statistics.maxPrice?.toLocaleString()}`}
                  color="red"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
