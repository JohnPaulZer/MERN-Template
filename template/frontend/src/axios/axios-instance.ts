import { useTokenStore } from "@/stores/token/token.store";
import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useTokenStore.getState().accessToken;

  // Attach the access token to the Authorization header when available.
  if (token) config.headers?.set("Authorization", `Bearer ${token}`);
  else config.headers?.delete?.("Authorization");

  return config;
});

// Use a shared refresh promise to prevent parallel refresh requests.
let refreshPromise: Promise<string | null> | null = null;

async function runRefresh(): Promise<string | null> {
  // Request a new access token using the refresh token cookie.
  const res = await axiosInstance.post("/token/refresh");
  const newAccessToken: string | null = res.data?.accessToken ?? null;

  // Persist the new access token in the token store.
  useTokenStore.getState().setToken(newAccessToken);

  return newAccessToken;
}

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const original = err.config as RetriableConfig | undefined;

    // Only handle unauthorized responses that have an original request config.
    if (!original || err.response?.status !== 401) return Promise.reject(err);

    const url = String(original.url ?? "");

    // Do not attempt to refresh when the refresh endpoint itself fails.
    if (url.includes("/token/refresh")) {
      useTokenStore.getState().setToken(null);
      return Promise.reject(err);
    }

    // Prevent infinite retry loops for the same request.
    if (original._retry) {
      useTokenStore.getState().setToken(null);
      return Promise.reject(err);
    }

    original._retry = true;

    // Start a refresh request once and reuse it for concurrent 401 responses.
    if (!refreshPromise) {
      refreshPromise = runRefresh().finally(() => {
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;

    // Clear the token and reject when refresh fails or returns no access token.
    if (!newToken) {
      useTokenStore.getState().setToken(null);
      return Promise.reject(err);
    }

    // Normalize headers and retry the original request with the new access token.
    const headers = AxiosHeaders.from(original.headers ?? {});
    headers.set("Authorization", `Bearer ${newToken}`);
    original.headers = headers;

    return axiosInstance(original);
  },
);

export default axiosInstance;
