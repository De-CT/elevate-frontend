import { ENDPOINTS } from "@/constants/endpoints";
import { api } from ".";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const createAccount = async (data: RegisterData) => {
  try {
    const res = await api.post(`${ENDPOINTS.register}`, data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.response.data.message || e.message);
  }
};
