import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { SavingsHand, SavingsPackage } from "./savings-types";
import { formatMoney } from "./savings-utils";

interface Props {
  hand: SavingsHand;
  number: number;
  frequency: SavingsPackage["frequency"];
}

export default function HandItem({ hand, number, frequency }: Props) {
  const missed = hand.status === "payment-missed";

  return (
    <div
      className={`rounded-lg border p-3 text-xs ${
        missed
          ? "border-error/20 bg-error-container"
          : "border-surface-container-high bg-surface-container-lowest"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`font-label-md font-bold ${missed ? "text-on-error-container" : "text-on-surface"}`}>
          Hand #{number}
        </span>

        <span
          className={`flex items-center gap-1 rounded px-2 py-1 text-[10px] font-semibold ${
            missed
              ? "bg-error-container text-on-error-container"
              : "bg-secondary-container text-on-secondary-fixed-variant"
          }`}
        >
          {missed ? <AlertCircle size={11} /> : <CheckCircle2 size={11} />}
          {missed ? "Payment missed" : "On track"}
        </span>
      </div>

      <p className={`mt-2 font-body text-[11px] ${missed ? "text-on-error-container" : "text-outline"}`}>
        {formatMoney(hand.savedAmount)} saved · {hand.completedPeriods}{" "}
        {hand.completedPeriods === 1 ? "period" : "periods"} completed
      </p>

      {missed && (
        <p className="mt-2 font-body text-[11px] font-medium text-on-error-container">
          Use manual payment to recover this missed payment.
        </p>
      )}
    </div>
  );
}