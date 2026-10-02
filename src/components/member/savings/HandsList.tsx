import type { SavingsPackage } from "./savings-types";
import {
  formatMoney,
  getNextPayment,
  getPeriodLabel,
  getProgress,
  getSavedAmount,
  getTargetAmount,
} from "./savings-utils";

interface Props {
  savings: SavingsPackage;
}

export default function SavingsProgress({ savings }: Props) {
  const saved = getSavedAmount(savings);
  const target = getTargetAmount(savings);
  const progress = getProgress(savings);
  const nextPayment = getNextPayment(savings);
  const period = getPeriodLabel(savings.frequency);

  return (
    <section className="space-y-4 rounded-xl border border-surface-container-low bg-surface p-4 sm:p-5">
      <div>
        <p className="font-label-xs text-xs font-medium text-outline">
          Total package progress
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          <span className="font-currency-card text-2xl font-bold text-primary sm:text-3xl">
            {formatMoney(saved)}
          </span>
          <span className="font-label-md text-sm font-semibold text-outline">
            / {formatMoney(target)} target
          </span>
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between gap-3 text-xs font-semibold">
          <span className="text-on-surface-variant">
            {savings.completedPeriods} of {savings.duration} {period} completed
          </span>
          <span className="font-label-md text-primary">{progress}%</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-surface-container-high"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Savings progress"
        >
          <div
            className="h-full rounded-full bg-secondary-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-1 border-t border-surface-container-low pt-3">
        <p className="font-label-xs text-xs font-semibold text-on-surface">
          Next payment: {formatMoney(nextPayment)}
          <span className="font-body font-normal text-on-surface-variant">
            {" "}
            ({savings.hands.length} hands × {formatMoney(savings.handAmount)}{" "}
            {savings.frequency.toLowerCase()})
          </span>
        </p>
        <p className="font-body text-[11px] text-outline">
          {savings.nextPaymentDate
            ? `Next payment date: ${savings.nextPaymentDate}.`
            : "Your next payment date will appear here."}
        </p>
      </div>
    </section>
  );
}