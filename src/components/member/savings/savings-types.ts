export type SavingsProgram = "Pinnacle" | "Chop Beta";
export type SavingsStatus = "active" | "completed" | "pending-activation";
export type HandStatus = "on-track" | "payment-missed" | "completed" | "pending-activation";
export type ProgramFilter = "all" | "Pinnacle" | "Chop Beta";
export type StatusFilter = "active" | "pending-activation" | "completed" | "all";

export interface SavingsHand {
  id: string;
  handNumber: number;
  savedAmount: number;
  completedPeriods: number;
  missedCycles: number;
  activatedAt: string | null;
  maturedAt: string | null;
  status: HandStatus;
  nextDue: {
    amount: string;
    lateFee?: string;
  } | null;
}

export interface SavingsPackage {
  id: string;
  createdAt: string;
  name: SavingsProgram;
  batchCode: string;
  status: SavingsStatus;
  frequency: "Weekly" | "Monthly";
  handAmount: number;
  duration: number;
  completedPeriods: number;
  hands: SavingsHand[];
  nextPaymentDate?: string;
  nextPaymentAmount: number;
  registrationFeeDue: number;
  benefit?: string;
}

export interface NewSavingsSelection {
  packageType: "PINNACLE" | "CHOP_BETA";
  hands: number;
}