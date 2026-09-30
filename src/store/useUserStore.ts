import { create } from "zustand";

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  kycStatus: string;
  bvnLast4: string;
  virtualAccount: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
}

interface UserType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserType>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
