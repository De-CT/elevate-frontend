export type TransactionType = "added" | "savings";
export type TransactionStatus = "successful" | "paid" | "pending" | "failed" | "unknown";

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  description: string;
  amount: number;
  status: TransactionStatus;
  date: string;
  dateLabel: string;
  plan?: string;
  program?: string;
  method: string;
  reference: string;
  receiptReference?: string;
  contributionLabel?: string;
}

export interface TransactionGroup {
  label: string;
  transactions: Transaction[];
}