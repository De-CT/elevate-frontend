import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useAppStore } from "@/store/useAppStore";
import { ENDPOINTS } from "@/constants/endpoints";
import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { AuthTokens } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

type RetryConfig = InternalAxiosRequestConfig & {
  _authTokenUsed?: string;
  _retry?: boolean;
};

let refreshRequest: Promise<AuthTokens> | null = null;

function isAuthEndpoint(url?: string) {
  return [ENDPOINTS.login, ENDPOINTS.register, ENDPOINTS.refresh].some((endpoint) =>
    url?.includes(endpoint)
  );
}

function logoutAfterRefreshFailure() {
  useAuthStore.getState().clearAuthToken();
  useUserStore.getState().clearUser();
  useAppStore.getState().setRegistrationDraft(null);

  if (typeof window !== "undefined" && !["/login", "/register"].includes(window.location.pathname)) {
    window.dispatchEvent(new Event("ehf:session-expired"));
  }
}

api.interceptors.request.use(async (config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
    (config as RetryConfig)._authTokenUsed = token.accessToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;
    const isUnauthorized = error.response?.status === 401;

    if (!isUnauthorized || !originalRequest || originalRequest._retry || isAuthEndpoint(originalRequest.url)) {
      return Promise.reject(error);
    }

    const tokens = useAuthStore.getState().token;
    if (!tokens?.refreshToken) return Promise.reject(error);

    originalRequest._retry = true;

    try {
      if (originalRequest._authTokenUsed && originalRequest._authTokenUsed !== tokens.accessToken) {
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return api(originalRequest);
      }

      refreshRequest ??= axios
        .post<AuthTokens>(ENDPOINTS.refresh, { refreshToken: tokens.refreshToken }, {
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          timeout: 10000,
        })
        .then(({ data }) => data)
        .finally(() => {
          refreshRequest = null;
        });

      const refreshedTokens = await refreshRequest;
      useAuthStore.getState().setAuthToken(refreshedTokens);
      originalRequest.headers.Authorization = `Bearer ${refreshedTokens.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      const refreshStatus = (refreshError as AxiosError).response?.status;
      if (refreshStatus === 401 || refreshStatus === 403) {
        logoutAfterRefreshFailure();
      }
      return Promise.reject(refreshError);
    }
  },
);
