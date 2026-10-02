import { FAQ, SupportCategory } from "./support-types";

export const supportCategories: SupportCategory[] = [
  {
    id: "wallet",
    title: "My Wallet",
    description: "Adding money and checking your balance",
    icon: "wallet",
  },
  {
    id: "savings",
    title: "My Savings",
    description: "Packages, contributions, and progress",
    icon: "savings",
  },
  {
    id: "account",
    title: "My Account",
    description: "Your details, PIN, and account access",
    icon: "user",
  },
  {
    id: "payments",
    title: "Payments",
    description: "Payment records and missed contributions",
    icon: "receipt",
  },
  {
    id: "programmes",
    title: "Foundation Programmes",
    description: "Training, support, and opportunities",
    icon: "book",
  },
  {
    id: "general",
    title: "Something Else",
    description: "Other questions about the foundation",
    icon: "help",
  },
];

export const faqs: FAQ[] = [
  {
    id: "wallet-funding",
    category: "wallet",
    question: "How do I add money to my Elevate Wallet?",
    answer:
      "Transfer money from your bank to the dedicated account shown in your Elevate Wallet. Your wallet balance will update after the transfer is confirmed. Always check the account details in your own wallet before making a transfer.",
  },
  {
    id: "wallet-delay",
    category: "wallet",
    question: "What if my transfer has not shown in my wallet?",
    answer:
      "First, check that the transfer was successful in your bank app. If your wallet has not updated after some time, contact support and share your transfer receipt. Do not share your PIN or password.",
  },
  {
    id: "savings-payment",
    category: "savings",
    question: "How do I pay for my savings?",
    answer:
      "Your contribution is normally deducted from your Elevate Wallet on the due date. If a deduction is missed, open My Savings and use the manual payment option where available.",
  },
  {
    id: "savings-end",
    category: "savings",
    question: "When does my savings end?",
    answer:
      "The duration depends on your selected package and is shown in the current package details. You can check your progress and remaining periods on the My Savings page.",
  },
  {
    id: "missed-payment",
    category: "payments",
    question: "What happens if I miss a payment?",
    answer:
      "A missed payment may attract the default fee for your package. Open My Savings to view the amount due for the affected hand before making a payment. If you need help, contact the support team.",
  },
  {
    id: "payment-history",
    category: "payments",
    question: "Where can I see my payment history?",
    answer:
      "Open your wallet or savings details to view the transactions and contributions recorded on your account. Contact support if a payment is missing or looks incorrect.",
  },
  {
    id: "change-pin",
    category: "account",
    question: "How do I change my PIN?",
    answer:
      "PIN changes are handled by account support. Contact the community desk or use the message form below to request a secure change. Never include your current PIN in a message.",
  },
  {
    id: "update-details",
    category: "account",
    question: "How can I update my personal details?",
    answer:
      "Your current profile details are available in Settings. To request a correction, contact the community support team; profile editing is not available in the app yet.",
  },
  {
    id: "referrals",
    category: "programmes",
    question: "When can I start referring people?",
    answer:
      "Referral access opens after Week 4 of regular weekly savings. When it becomes available, you can find your referral information in your member account.",
  },
  {
    id: "clearance",
    category: "savings",
    question: "What is the clearance fee?",
    answer:
      "A clearance fee may apply to a package at the end of its savings period. The fee depends on the package. Check your package details for the amount that applies to you.",
  },
  {
    id: "general-help",
    category: "general",
    question: "How can I speak to someone at the foundation?",
    answer:
      "You can call the support line, send a message using the form below, or visit your community support desk.",
  },
];