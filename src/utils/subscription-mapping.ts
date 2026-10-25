import type { Subscription } from "@/types/subscription";
import type { SavingsHand, SavingsPackage } from "@/components/member/savings/savings-types";

const toAmount = (value: string | undefined) => Number(value ?? 0);

export function toSavingsPackage(subscription: Subscription): SavingsPackage {
  const contributionAmount = toAmount(subscription.package.contributionAmount);
  const hands: SavingsHand[] = subscription.hands.map((hand) => ({
    id: hand.id,
    handNumber: hand.handNumber,
    savedAmount: hand.cyclesCompleted * contributionAmount,
    completedPeriods: hand.cyclesCompleted,
    missedCycles: hand.missedCycles,
    activatedAt: hand.activatedAt,
    maturedAt: hand.maturedAt,
    status:
      hand.status === "ACTIVE"
        ? "on-track"
        : hand.status === "MATURED" || hand.status === "COMPLETED"
          ? "completed"
          : hand.status === "MISSED" || hand.status === "PAYMENT_MISSED"
            ? "payment-missed"
            : "pending-activation",
    nextDue: hand.nextDue,
  }));

  const allCompleted = hands.length > 0 && hands.every((hand) => hand.status === "completed");
  const hasActiveHands = hands.some((hand) => hand.status === "on-track" || hand.status === "payment-missed");
  const isPendingActivation =
    hands.length > 0 &&
    hands.some((hand) => hand.status === "pending-activation") &&
    !hasActiveHands;
  const dueDate = subscription.nextDue?.date;
  const nextPaymentAmount =
    subscription.nextDue != null
      ? toAmount(subscription.nextDue.amount)
      : hands.reduce(
          (total, hand) =>
            total +
            toAmount(hand.nextDue?.amount) +
            toAmount(hand.nextDue?.lateFee),
          0
        );

  return {
    id: subscription.id,
    createdAt: subscription.createdAt,
    name: subscription.package.type === "CHOP_BETA" ? "Chop Beta" : "Pinnacle",
    batchCode: subscription.id,
    status: allCompleted ? "completed" : isPendingActivation ? "pending-activation" : "active",
    frequency: subscription.package.occurrence === "MONTHLY" ? "Monthly" : "Weekly",
    handAmount: contributionAmount,
    duration: subscription.package.duration,
    completedPeriods: hands.length
      ? Math.min(...hands.map((hand) => hand.completedPeriods))
      : 0,
    hands,
    nextPaymentDate: dueDate ?? undefined,
    nextPaymentAmount,
    registrationFeeDue: toAmount(subscription.registrationFeeDue),
  };
}
