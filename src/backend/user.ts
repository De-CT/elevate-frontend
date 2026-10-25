import { ENDPOINTS } from "@/constants/endpoints";
import type { Package, RegistrationSubscriptionResponse } from "@/store/useAppStore";
import type { Subscription } from "@/types/subscription";
import { api } from ".";

export const getProfile = async () => {
  try {
    const res = await api.get(`${ENDPOINTS.profile}`);
    console.log("res", res.data);
    return res.data;
  } catch (e: any) {
    console.log("error", e.message);
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const bvnVerify = async (data: { bvn: string }) => {
  try {
    const res = await api.post(`${ENDPOINTS.bvnVerify}`, data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const listPackages = async (): Promise<Package[]> => {
  try {
    const res = await api.get<Package[]>(`${ENDPOINTS.listPackages}`);
    console.log("packages", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const subscribeToPackage = async (data: {
  packageType: Package["type"];
  quantity: number;
}): Promise<RegistrationSubscriptionResponse> => {
  try {
    const res = await api.post<RegistrationSubscriptionResponse>(`${ENDPOINTS.subscribeToPackage}`, data);
    console.log("subccribe", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message ?? e?.message ?? "Unable to create subscription.");
  }
};

export const listSubscriptions = async (): Promise<Subscription[]> => {
  try {
    const res = await api.get<Subscription[]>(`${ENDPOINTS.listSubscriptions}`);
    console.log("subccribe", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export type WalletResponse = {
  availableBalance: number | string;
  committedBalance: number | string;
};

export const getWallet = async (): Promise<WalletResponse> => {
  try {
    const res = await api.get<WalletResponse>(`${ENDPOINTS.wallet}`);
    console.log("wallet", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const getWalletHistory = async () => {
  try {
    const res = await api.get(`${ENDPOINTS.walletHistory}`);
    console.log("wallet history", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const claimSubscription = async (
  data: { groupId: string; subscriptionId?: never } | { subscriptionId: string; groupId?: never }
) => {
  try {
    const res = await api.post(`${ENDPOINTS.packageRegistrationPayment}`, data);
    console.log("claimSubscription", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e?.response?.data?.message ?? e?.message ?? "Unable to claim subscription.");
  }
};

export const simulateDeposit = async (data: {
  accountNumber: string;
  amount: number;
}) => {
  try {
    const res = await api.post(`${ENDPOINTS.simulateDeposit}`, data);
    console.log("simulate deposit", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const getSubscription = async (id: string): Promise<Subscription> => {
  try {
    const res = await api.get<Subscription>(`${ENDPOINTS.listSubscriptions}/${id}`);
    console.log("get subscription", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};
