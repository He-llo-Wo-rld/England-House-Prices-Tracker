export interface PropertyData {
  id: string;
  postcode: string;
  price: number;
  propertyType: "detached" | "semi" | "terraced" | "flat";
  dateSold: Date;
  region: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface RegionData {
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
}

export interface SearchFilters {
  postcode?: string;
  region?: string;
  propertyType?: PropertyData["propertyType"];
  priceMin?: number;
  priceMax?: number;
}
