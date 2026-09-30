import { ENDPOINTS } from "@/constants/endpoints";
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

export const listPackages = async () => {
  try {
    const res = await api.get(`${ENDPOINTS.listPackages}`);
    console.log("packages", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const subscribeToPackage = async (data: {
  packageType: string;
  quantity: number;
}) => {
  try {
    const res = await api.post(`${ENDPOINTS.subscribeToPackage}`, data);
    console.log("subccribe", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const listSubscriptions = async () => {
  try {
    const res = await api.get(`${ENDPOINTS.listSubscriptions}`);
    console.log("subccribe", res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};
