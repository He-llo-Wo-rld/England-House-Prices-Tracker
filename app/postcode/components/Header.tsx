import { PostcodeData } from "@/types/postcode";
import { useRouter } from "next/navigation";

export const Header = ({ data }: { data: PostcodeData }) => {
  const router = useRouter();
  
  return (
    <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {data.postcode}
              </h1>
              <p className="text-gray-600">{data.region}</p>
            </div>
          </div>
        </div>
      </div>
  );
};
