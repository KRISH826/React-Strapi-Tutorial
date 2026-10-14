import apiClient, { STRAPI_BASE_URL } from "./axios.interceptor";

// Lightweight types for Home Page Data
export interface BannerData {
  title?: string;
  description?: string;
  buttonLabel?: string;
  banner?: {
    url?: string;
    alternativeText?: string | null;
  };
}

export interface HomePageApiResponse {
  data: BannerData & {
    id?: number;
    documentId?: string;
  };
  meta?: Record<string, unknown>;
}

/**
 * Fetch Home Page content from Strapi
 * Endpoint: /api/home-page?populate=*
 */
export const getHomePageData = async (): Promise<BannerData | null> => {
  try {
    const res = await apiClient.get<HomePageApiResponse>("/api/home-page?populate=*");
    return res.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
    throw error;
  }
};

/**
 * Format relative Strapi image URLs (/uploads/...) with base URL (http://localhost:1337)
 */
export const getStrapiMediaUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};
