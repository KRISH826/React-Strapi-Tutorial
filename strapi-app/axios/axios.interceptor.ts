import axios, { AxiosError } from "axios";

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Main production-ready Axios instance
const apiClient = axios.create({
  baseURL: STRAPI_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response Interceptor: handles responses, unified error parsing, and status code handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ error?: { message?: string }; message?: string }>) => {
    const customMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.message ||
      "Unexpected network or server error";

    console.error(`[API Response Error] [${error.config?.url}]:`, {
      status: error.response?.status,
      message: customMessage,
    });

    return Promise.reject({
      status: error.response?.status,
      message: customMessage,
      originalError: error,
    });
  }
);

export default apiClient;
