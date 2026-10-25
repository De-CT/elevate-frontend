import { ENDPOINTS } from "@/constants/endpoints";
import { api } from ".";
import { LoginData, RegisterData } from "../../interface";

export const createAccount = async (data: RegisterData) => {
  try {
    const res = await api.post(`${ENDPOINTS.register}`, data);
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

export const login = async (data: LoginData) => {
  try {
    const res = await api.post(`${ENDPOINTS.login}`, data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const refreshToken = async (data: { refreshToken: string }) => {
  try {
    const res = await api.post(`${ENDPOINTS.refresh}`, data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};

export const logOut = async (data: { refreshToken: string }) => {
  try {
    const res = await api.post(`${ENDPOINTS.logout}`, data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message ?? e.message);
  }
};
