import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

interface AuthType {
  token: AuthTokens | null;
  setAuthToken: (token: AuthTokens) => void;
  clearAuthToken: () => void;
}

export const AUTH_TOKEN_STORAGE_KEY = "elevate-heart-auth-tokens";

export const useAuthStore = create<AuthType>()(
  persist<AuthType, [], [], Pick<AuthType, "token">>(
    (set) => ({
      token: null,
      setAuthToken: (token) => set({ token }),
      clearAuthToken: () => set({ token: null }),
    }),
    {
      name: AUTH_TOKEN_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);
