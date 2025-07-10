import { PostcodeData } from "@/types/postcode";

export const PropertyTypes = ({ data }: { data: PostcodeData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Property Types</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(data.propertyTypes).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{count}</p>
                <p className="text-sm text-gray-600 capitalize">
                  {type.replace("_", " ").toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
    );}