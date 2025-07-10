export interface PostcodeData {
  postcode: string;
  region: string;
  coordinates: { lat: number; lng: number } | null;
  statistics: {
    averagePrice: number;
    medianPrice: number;
    minPrice: number;
    maxPrice: number;
    totalSales: number;
    priceRange: string;
    regionAverage: number;
    vsRegion: number;
  };
  propertyTypes: Record<string, number>;
  recentSales: Array<{
    id: string;
    price: number;
    propertyType: string;
    dateSold: string;
    coordinates: { lat: number; lng: number } | null;
  }>;
  lastUpdated: string;
}

export type PostcodePageProps = {
  params: { postcode: string };
};