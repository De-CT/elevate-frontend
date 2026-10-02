import type { SavingsPackage } from "./savings-types";

export const demoSavings: SavingsPackage[] = [
  {
    id: "demo-pinnacle",
    name: "Pinnacle",
    batchCode: "PIN-DEMO-001",
    status: "active",
    frequency: "Weekly",
    handAmount: 5000,
    duration: 12,
    completedPeriods: 8,
    nextPaymentDate: "19 Sep 2026",
    hands: [
      { id: "1", savedAmount: 40000, completedPeriods: 8, status: "on-track" },
      { id: "2", savedAmount: 40000, completedPeriods: 8, status: "on-track" },
      { id: "3", savedAmount: 35000, completedPeriods: 7, status: "payment-missed" },
      { id: "4", savedAmount: 40000, completedPeriods: 8, status: "on-track" },
      { id: "5", savedAmount: 40000, completedPeriods: 8, status: "on-track" },
    ],
  },
  {
    id: "demo-chop",
    name: "Chop Beta",
    batchCode: "CHOP-DEMO-001",
    status: "active",
    frequency: "Monthly",
    handAmount: 30000,
    duration: 5,
    completedPeriods: 2,
    nextPaymentDate: "20 Oct 2026",
    benefit: "Foodstuff benefit upon completion",
    hands: [
      { id: "1", savedAmount: 30000, completedPeriods: 2, status: "on-track" },
      { id: "2", savedAmount: 30000, completedPeriods: 2, status: "on-track" },
      { id: "3", savedAmount: 30000, completedPeriods: 2, status: "on-track" },
    ],
  },
];