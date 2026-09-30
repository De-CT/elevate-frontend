import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Package = {
  clearanceFee: string;
  durationWeeks: number;
  id: string;
  isActive: boolean;
  name: "Pinnacle" | "Chop Beta";
  referralBonus: string;
  registrationFee: string;
  type: "PINNACLE" | "CHOP_BETA";
  weeklyAmount: string;
};

export type RegistrationSelection = {
  packageType: Package["type"];
  quantity: number;
};

export type RegistrationDraft = {
  selection: RegistrationSelection;
  userId: string;
};

interface AppStoreProps {
  activePackages: Package[] | null;
  registrationDraft: RegistrationDraft | null;
  setActivePackages: (packages: Package[]) => void;
  setRegistrationDraft: (draft: RegistrationDraft | null) => void;
}

export const REGISTRATION_SELECTION_STORAGE_KEY = "elevate-heart-registration-selection";

export const useAppStore = create<AppStoreProps>()(
  persist<AppStoreProps, [], [], Pick<AppStoreProps, "registrationDraft">>(
    (set) => ({
      activePackages: null,
      registrationDraft: null,
      setActivePackages: (packages) => set({ activePackages: packages }),
      setRegistrationDraft: (registrationDraft) => set({ registrationDraft }),
    }),
    {
      name: REGISTRATION_SELECTION_STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ registrationDraft: state.registrationDraft }),
    }
  )
);
