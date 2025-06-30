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

export interface RegionStats {
  region: string;
  averagePrice: number;
  medianPrice: number;
  priceChangeYoY: number;
  priceChangeMoM: number;
  salesCount: number;
  lastUpdated: Date;
}

export interface RegionData {
  name: string;
  slug: string;
  averagePrice: number;
  priceChange: number;
  salesCount: number;
  propertyTypes: {
    detached: { price: number; change: number };
    semi: { price: number; change: number };
    terraced: { price: number; change: number };
    flat: { price: number; change: number };
  };
  monthlyData: {
    month: string;
    averagePrice: number;
    salesCount: number;
  }[];
}

export interface SearchFilters {
  postcode?: string;
  region?: string;
  propertyType?: PropertyData["propertyType"];
  priceMin?: number;
  priceMax?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface AffordabilityInput {
  annualIncome: number;
  deposit: number;
  monthlyExpenses?: number;
  interestRate?: number;
}

export interface AffordabilityResult {
  maxPrice: number;
  monthlyPayment: number;
  isAffordable: boolean;
  suggestions: string[];
}
