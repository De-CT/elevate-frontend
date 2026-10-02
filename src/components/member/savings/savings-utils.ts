import type { SavingsPackage } from "./savings-types";

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export const getSavedAmount = (item: SavingsPackage) =>
  item.hands.reduce((total, hand) => total + hand.savedAmount, 0);

export const getTargetAmount = (item: SavingsPackage) =>
  item.hands.length * item.handAmount * item.duration;

export const getNextPayment = (item: SavingsPackage) =>
  item.hands.length * item.handAmount;

export const getProgress = (item: SavingsPackage) => {
  const target = getTargetAmount(item);
  if (!target) return 0;

  return Math.min(
    100,
    Math.round((getSavedAmount(item) / target) * 100)
  );
};

export const getPeriodLabel = (frequency: SavingsPackage["frequency"]) =>
  frequency === "Weekly" ? "weeks" : "months";