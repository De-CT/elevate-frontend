import type { UpcomingPayment, WalletTransaction } from "./wallet-types";

export const walletData = {
  // Replace these sample values with the member's API response.
  balance: 25000,
  memberId: "EH-8821",
  bankName: "Providus Bank",
  accountNumber: "0123456789",
  accountName: "Amina Yusuf (Elevate)",
};

export const upcomingPayments: UpcomingPayment[] = [
  {
    id: "pinnacle",
    packageName: "Pinnacle",
    hands: 5,
    frequency: "Weekly",
    amountPerHand: 5000,
    nextPayment: "Friday",
  },
  {
    id: "chop-beta",
    packageName: "Chop Beta",
    hands: 3,
    frequency: "Monthly",
    amountPerHand: 30000,
    nextPayment: "1st of next month",
  },
];

export const walletTransactions: WalletTransaction[] = [
  {
    id: "1",
    type: "in",
    title: "Money Received",
    description: "Transfer to your dedicated Elevate account",
    amount: 50000,
    date: "Today, 10:20 AM",
    status: "Received",
    reference: "EHF-TX-910382",
    method: "Bank transfer to 0123456789",
    details: "Dedicated Account Transfer",
  },
  {
    id: "2",
    type: "out",
    title: "Weekly Payment",
    description: "Pinnacle · 5 Hands · 5 × ₦5,000",
    amount: 25000,
    date: "Friday",
    status: "Completed",
    reference: "EHF-TX-892110",
    method: "Elevate Wallet (Automatic)",
    details: "Pinnacle · 5 Hands",
  },
  {
    id: "3",
    type: "out",
    title: "Monthly Payment",
    description: "Chop Beta · 3 Hands · 3 × ₦30,000",
    amount: 90000,
    date: "01 Sep 2026",
    status: "Completed",
    reference: "EHF-TX-880312",
    method: "Elevate Wallet (Automatic)",
    details: "Chop Beta · 3 Hands",
  },
  {
    id: "4",
    type: "out",
    title: "Recovery Payment",
    description: "Pinnacle · Hand 3 · Missed payment recovered",
    amount: 10000,
    date: "28 Aug 2026",
    status: "Recovered",
    reference: "EHF-TX-870045",
    method: "Elevate Wallet (Recovery)",
    details: "Pinnacle · Hand 3",
  },
];