"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPrice, formatPriceChange } from "@/lib/utils";

// Mock data - замінимо на real API calls пізніше
const regions = [
  {
    id: "1",
    name: "London",
    slug: "london",
    averagePrice: 687000,
    priceChange: 8.4,
    salesCount: 2847,
  },
  {
    id: "2",
    name: "Manchester",
    slug: "manchester",
    averagePrice: 285000,
    priceChange: 15.2,
    salesCount: 1240,
  },
  {
    id: "3",
    name: "Birmingham",
    slug: "birmingham",
    averagePrice: 245000,
    priceChange: 12.1,
    salesCount: 980,
  },
  {
    id: "4",
    name: "Bristol",
    slug: "bristol",
    averagePrice: 420000,
    priceChange: 6.8,
    salesCount: 650,
  },
  {
    id: "5",
    name: "Leeds",
    slug: "leeds",
    averagePrice: 220000,
    priceChange: 11.5,
    salesCount: 780,
  },
  {
    id: "6",
    name: "Liverpool",
    slug: "liverpool",
    averagePrice: 185000,
    priceChange: 14.3,
    salesCount: 920,
  },
];

export function RegionCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {regions.map((region) => {
        const priceChange = formatPriceChange(region.priceChange);

        return (
          <Card
            key={region.id}
            className="hover:shadow-md transition-shadow cursor-pointer group h-fit"
          >
            <CardHeader className="pb-2 p-4">
              <div className="flex items-start justify-between mb-1">
                <CardTitle className="text-base font-bold group-hover:text-blue-600 transition-colors leading-tight">
                  {region.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`${priceChange.color
                    .replace("text-", "bg-")
                    .replace("-600", "-100")} text-xs ml-2 flex-shrink-0`}
                >
                  {priceChange.symbol}
                  {priceChange.formatted}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0 p-4 space-y-3">
              <div className="space-y-1">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {formatPrice(region.averagePrice)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatNumber(region.salesCount)} sales
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full h-7 text-xs"
                onClick={() =>
                  (window.location.href = `/region/${region.slug}`)
                }
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
