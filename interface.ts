export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  referralCode: string | null;
}

export interface LoginData {
  identifier: string;
  password: string;
}
