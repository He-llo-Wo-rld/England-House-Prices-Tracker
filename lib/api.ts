import { ApiResponse, NationalStats, Region, TrendingArea } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Generic API call function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    console.log(`🔥 Making API call to: ${API_BASE_URL}${endpoint}`);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    console.log(`📡 Response status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ API response received:`, data);
    return data;
  } catch (error) {
    console.error(`❌ API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Regions API
export const search = async (query: string, limit: number = 8) => {
  return apiCall<{
    success: boolean;
    data: any[];
    meta: {
      query: string;
      total: number;
      limit: number;
    };
  }>(`/search?q=${encodeURIComponent(query)}&limit=${limit}`);
};

export const regionsApi = {
  // Get all regions
  getAll: async (): Promise<{
    regions: Region[];
    total: number;
    lastUpdated: string;
  }> => {
    return apiCall("/regions");
  },

  // Get specific region
  getBySlug: async (slug: string): Promise<Region> => {
    return apiCall(`/regions?region=${slug}`);
  },

  // Search regions
  search: async (query: string): Promise<Region[]> => {
    return apiCall(`/regions/search?q=${encodeURIComponent(query)}`);
  },
};

// National statistics API
export const statsApi = {
  // Get national statistics
  getNational: async (): Promise<ApiResponse<NationalStats>> => {
    return apiCall("/stats/national");
  },

  // Get regional comparison
  getRegionalComparison: async (): Promise<ApiResponse<any>> => {
    return apiCall("/stats/regional");
  },
};

// Trending areas API
export const trendingApi = {
  // Get trending areas
  getTrending: async (params?: {
    limit?: number;
    minChange?: number;
    region?: string;
  }): Promise<ApiResponse<TrendingArea[]>> => {
    const searchParams = new URLSearchParams();

    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.minChange)
      searchParams.set("minChange", params.minChange.toString());
    if (params?.region) searchParams.set("region", params.region);

    const query = searchParams.toString();
    return apiCall(`/trending${query ? `?${query}` : ""}`);
  },
};

// Search API
export const searchApi = {
  // General search
  search: async (
    query: string,
    filters?: {
      type?: "postcode" | "region" | "property" | "all";
      limit?: number;
      priceMin?: number;
      priceMax?: number;
    }
  ): Promise<ApiResponse<any[]>> => {
    const searchParams = new URLSearchParams({ q: query });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.set(key, value.toString());
        }
      });
    }

    return apiCall(`/search?${searchParams.toString()}`);
  },

  // Postcode lookup with detailed info
  postcode: async (postcode: string): Promise<ApiResponse<any>> => {
    return apiCall(`/search/postcode?code=${encodeURIComponent(postcode)}`);
  },

  // Autocomplete for quick suggestions
  autocomplete: async (
    query: string,
    limit = 5
  ): Promise<ApiResponse<any[]>> => {
    return apiCall(
      `/search?q=${encodeURIComponent(query)}&limit=${limit}&autocomplete=true`
    );
  },
};

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Cache utility for client-side caching
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private TTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();
