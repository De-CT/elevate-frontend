export type SupportCategoryId =
  | "wallet"
  | "savings"
  | "account"
  | "payments"
  | "programmes"
  | "general";

export type SupportCategory = {
  id: SupportCategoryId;
  title: string;
  description: string;
  icon: "wallet" | "savings" | "user" | "receipt" | "book" | "help";
};

export type FAQ = {
  id: string;
  category: SupportCategoryId;
  question: string;
  answer: string;
};