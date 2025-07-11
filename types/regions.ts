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

export interface RegionDetail {
  id: string;
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  description: string;
  lastUpdated: string;
  propertyTypes: {
    detached: { price: number };
    semi: { price: number };
    terraced: { price: number };
    flat: { price: number };
  };
}