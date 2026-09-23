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
    console.log("register res", res);
  } catch (e: unknown) {
    console.log("error fro register", e);
  }
};
