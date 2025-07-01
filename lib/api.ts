// Simplified API utilities - removed duplicates and unused code
const API_BASE = "/api";

export const searchApi = {
  async search(query: string, limit = 8) {
    const response = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Search failed");
    }

    return data;
  },
};

export const regionsApi = {
  async getAll() {
    const response = await fetch(`${API_BASE}/regions`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch regions");
    }

    return data;
  },
};
