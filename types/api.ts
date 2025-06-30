export interface Region {
  id: string;
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  description: string;
  lastUpdated: string;
  propertyTypes: {
    detached: PropertyTypeData;
    semi: PropertyTypeData;
    terraced: PropertyTypeData;
    flat: PropertyTypeData;
  };
}

export interface PropertyTypeData {
  price: number;
  change: number;
}

// National statistics types
export interface NationalStats {
  averagePrice: number;
  priceChangeYoY: number;
  priceChangeMoM: number;
  totalSales: number;
  lastUpdated: string;
  topPerformer: {
    name: string;
    region: string;
    change: number;
  };
  dataSource: string;
  marketTrend: "increasing" | "decreasing" | "stable";
  averagePriceByType: {
    detached: number;
    semi: number;
    terraced: number;
    flat: number;
  };
  regionalBreakdown: Record<
    string,
    {
      averagePrice: number;
      change: number;
    }
  >;
}

// Trending area types
export interface TrendingArea {
  id: string;
  name: string;
  region: string;
  priceChange: number;
  averagePrice: number;
  reason: string;
  salesVolume: number;
  marketCap: "small" | "medium" | "large";
  trend: "strongly_increasing" | "increasing" | "stable" | "decreasing";
  coordinates: {
    lat: number;
    lng: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  meta?: {
    total: number;
    filters?: Record<string, any>;
    lastUpdated: string;
  };
}

// Search types
export interface SearchQuery {
  query: string;
  type: "postcode" | "region" | "area";
  filters?: {
    priceMin?: number;
    priceMax?: number;
    propertyType?: "detached" | "semi" | "terraced" | "flat";
    region?: string;
  };
}

export interface SearchResult {
  id: string;
  name: string;
  type: "region" | "area" | "postcode";
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
