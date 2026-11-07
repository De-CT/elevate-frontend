import type { Package } from "@/store/useAppStore";

export type SubscriptionDue = {
  amount: string;
  date?: string | null;
  lateFee?: string;
};

export type SubscriptionOverdue = SubscriptionDue & {
  cycles: number;
};

export type SubscriptionHand = {
  id: string;
  handNumber: number;
  status: string;
  cyclesCompleted: number;
  missedCycles: number;
  activatedAt: string | null;
  maturedAt: string | null;
  nextDue: SubscriptionDue | null;
  overdue?: SubscriptionOverdue | null;
};

export type Subscription = {
  id: string;
  createdAt: string;
  package: Package;
  registrationFeeDue: string;
  nextDue: SubscriptionDue | null;
  hands: SubscriptionHand[];
};
