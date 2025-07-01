"use client";

export function DataDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-amber-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">
            Demo Data Notice
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              This application currently uses{" "}
              <strong>realistic mock data</strong> for demonstration purposes.
              The property prices, transaction dates, and statistics shown are
              generated to match real UK market patterns but are{" "}
              <strong>not actual Land Registry data</strong>.
            </p>
            <div className="mt-3">
              <p className="font-medium">What&apos;s included:</p>{" "}
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Realistic price ranges for England&apos;s 9 regions</li>
                <li>Authentic postcode patterns and property types</li>
                <li>Market-accurate growth rates and trends</li>
                <li>~1,000 sample transactions updated weekly</li>
              </ul>
            </div>
            <div className="mt-3 text-xs">
              <p>
                📊 Educational demo application with simulated UK property
                market data. Current data refreshes automatically based on
                system date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
