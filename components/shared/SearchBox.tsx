import { Button, SearchTag } from "../ui";

type SearchBoxProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  handleSearch: (term: string) => void;
  popularSearches: string[];
};

export const SearchBox = ({
  searchTerm, setSearchTerm, isLoading, handleSearch, popularSearches
}: SearchBoxProps) => {
  return (
    <>
    <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            England Property Market
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Educational demo of property market interface across England
            regions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }}
              className="flex gap-3 mb-4"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by postcode or region..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
              />
              <Button
                disabled={isLoading}
                className="px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </form>

            <div className="flex gap-2 justify-center items-center">
              <span className="text-xs text-gray-500">Try:</span>
              {popularSearches.map((term) => (
                <SearchTag
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    handleSearch(term);
                  }}
                >
                  {term}
                </SearchTag>
              ))}
            </div>
          </div>
        </div> 
        </>
    
  );
};
