import { ENDPOINTS } from "@/constants/endpoints";
import { api } from ".";
import { LoginData, RegisterData } from "../../interface";

export const createAccount = async (data: RegisterData) => {
  try {
    const res = await api.post(`${ENDPOINTS.register}`, data);
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
