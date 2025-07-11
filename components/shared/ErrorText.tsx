export const ErrorText = ({ error }: { error: string }) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div className="text-red-600 text-sm font-medium mb-1">
          Search not found
        </div>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    </div>
  );
};
