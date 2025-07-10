import { useRouter } from "next/navigation";

export const PostcodeNotFound = ({ error }: { error: string }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-6xl mb-4">📮</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Postcode Not Found
        </h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-500">Try:</p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Different postcode format (e.g., SW1A 1AA)</li>
            <li>• Checking if the postcode exists</li>
            <li>• Searching for a nearby area</li>
          </ul>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
