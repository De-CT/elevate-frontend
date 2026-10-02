export type SavingsProgram = "Pinnacle" | "Chop Beta";
export type SavingsStatus = "active" | "completed";
export type HandStatus = "on-track" | "payment-missed" | "completed";
export type ProgramFilter = "all" | "Pinnacle" | "Chop Beta";
export type StatusFilter = "active" | "completed" | "all";

export interface SavingsHand {
  id: string;
  savedAmount: number;
  completedPeriods: number;
  status: HandStatus;
}

export interface SavingsPackage {
  id: string;
  name: SavingsProgram;
  batchCode: string;
  status: SavingsStatus;
  frequency: "Weekly" | "Monthly";
  handAmount: number;
  duration: number;
  completedPeriods: number;
  hands: SavingsHand[];
  nextPaymentDate?: string;
  benefit?: string;
}

export interface NewSavingsSelection {
  program: SavingsProgram;
  hands: number;
}