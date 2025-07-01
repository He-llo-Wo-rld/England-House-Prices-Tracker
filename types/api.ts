// Core data types
export interface Region {
  id: string;
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  description: string;
  lastUpdated: string;
}

export interface Property {
  id: string;
  postcode: string;
  price: number;
  propertyType: "DETACHED" | "SEMI_DETACHED" | "TERRACED" | "FLAT";
  region: string;
  dateSold: string;
}

export interface SearchStatistics {
  totalFound: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface SearchData {
  query: string;
  properties: Property[];
  statistics: SearchStatistics;
  total: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
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
