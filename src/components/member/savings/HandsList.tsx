import type { SavingsPackage } from "./savings-types";
import { formatMoney, getPeriodLabel } from "./savings-utils";

export default function HandsList({ savings }: { savings: SavingsPackage }) {
  const period = getPeriodLabel(savings.frequency);

  return (
    <ul className="divide-y divide-surface-container-low">
      {savings.hands.map((hand) => (
        <li
          key={hand.id}
          className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
        >
          <div>
            <p className="font-label-md text-sm font-semibold text-on-surface">
              Hand {hand.handNumber}
            </p>
            <p className="font-body text-xs text-on-surface-variant">
              {hand.completedPeriods} of {savings.duration} {period} completed
              {hand.missedCycles > 0 ? ` · ${hand.missedCycles} missed` : ""}
            </p>
            {hand.activatedAt && (
              <p className="font-body text-[11px] text-outline">
                Activated {new Date(hand.activatedAt).toLocaleDateString("en-NG")}
              </p>
            )}
            {hand.maturedAt && (
              <p className="font-body text-[11px] text-outline">
                Matured {new Date(hand.maturedAt).toLocaleDateString("en-NG")}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="font-label-md text-sm font-semibold text-on-surface">
              {formatMoney(hand.savedAmount)} saved
            </p>
            <p className="font-body text-xs text-outline">
              {hand.status === "on-track"
                ? "Active"
                : hand.status === "payment-missed" || hand.missedCycles > 0
                  ? "Needs attention"
                  : hand.status === "pending-activation"
                    ? "Pending activation"
                    : "Completed"}
            </p>
            {hand.nextDue && (
              <p className="mt-1 font-body text-[11px] text-outline">
                Due {formatMoney(Number(hand.nextDue.amount))}
                {Number(hand.nextDue.lateFee) > 0
                  ? ` + ${formatMoney(Number(hand.nextDue.lateFee))} late fee`
                  : ""}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
