import { create } from "zustand";

interface AuthType {
  token: string | null;
  setAuthToken: (token: string) => void;
}
export const useAuthStore = create<AuthType>((set) => ({
  token: null,

  setAuthToken: (token: string) => set({ token }),
}));
