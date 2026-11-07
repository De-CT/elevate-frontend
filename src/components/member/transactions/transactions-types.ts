export type TransactionType = "added" | "savings" | "other";
export type TransactionDirection = "CREDIT" | "DEBIT";

export interface Transaction {
  id: string;
  type: TransactionType;
  direction: TransactionDirection;
  title: string;
  description: string;
  amount: number;
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