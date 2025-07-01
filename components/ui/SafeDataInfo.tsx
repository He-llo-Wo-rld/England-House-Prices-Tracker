"use client";

interface SafeDataInfoProps {
  className?: string;
  showIcon?: boolean;
}

export function SafeDataInfo({
  className = "",
  showIcon = true,
}: SafeDataInfoProps) {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 ${className}`}
    >
      <div className="text-center">
        {showIcon && <div className="text-lg mb-1">📊</div>}
        <div className="text-sm font-medium text-gray-700">Demo Data</div>
        <div className="text-lg font-bold text-amber-700">{currentDate}</div>
        <div className="text-xs text-gray-500 mt-1">
          Educational purposes only
        </div>
      </div>
    </div>
  );
}

// Alternative compact version
export function CompactDataInfo() {
  return (
    <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
      <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
      <span>Demo data • Updated automatically</span>
    </div>
  );
}
