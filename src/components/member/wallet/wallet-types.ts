export type TransactionType = "in" | "out";

export type WalletTransaction = {
  id: string;
  type: TransactionType;
  title: string;
  description: string;
  amount: number;
  date: string;
  status: string;
  reference: string;
  method: string;
  details: string;
};

export type UpcomingPayment = {
  id: string;
  packageName: string;
  hands: number;
  frequency: "Weekly" | "Monthly";
  amountPerHand: number;
  nextPayment: string;
};