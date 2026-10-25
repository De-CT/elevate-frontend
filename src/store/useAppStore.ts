import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PackageOccurrence = "WEEKLY" | "MONTHLY";

export type Package = {
  clearanceFee: string;
  contributionAmount: string;
  id: string;
  isActive: boolean;
  name: string;
  occurrence: PackageOccurrence;
  duration: number;
  referralBonus: string;
  registrationFee: string;
  type: "PINNACLE" | "CHOP_BETA";
};

export type RegistrationSelection = {
  packageType: Package["type"];
  quantity: number;
};

export type RegistrationSubscription = {
  id: string;
  hands?: Array<{ id: string }>;
  [key: string]: unknown;
};

export type RegistrationSubscriptionResponse =
  | RegistrationSubscription[]
  | RegistrationSubscription;

export function getRegistrationSubscriptions(
  response: RegistrationSubscriptionResponse | null | undefined
): RegistrationSubscription[] {
  if (!response) return [];
  return Array.isArray(response) ? response : [response];
}

export type RegistrationDraft = {
  selection: RegistrationSelection;
  userId: string;
  subscription?: RegistrationSubscriptionResponse | null;
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
