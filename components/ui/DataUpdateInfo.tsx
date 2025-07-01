"use client";

export function DataUpdateInfo() {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
      <div className="text-center">
        <div className="text-sm font-medium text-gray-600 mb-1">Demo Data</div>
        <div className="text-lg font-bold text-blue-600">{currentDate}</div>
        <div className="text-xs text-gray-500 mt-1">
          Educational purposes only
        </div>
      </div>
    </div>
  );
}
