// components/member/dashboard/SavingsCard.tsx
import Link from "next/link";
import { ArrowRight, CalendarClock, Store, ShoppingBasket } from "lucide-react";

type SavingsPlan = {
  id: string;
  packageName: string;
  hands: number;
  handsOnTrack: number;
  handsNeedingAttention: number;
  saved: number;
  target: number;
  currentPeriod: number;
  totalPeriods: number;
  periodLabel: string;
  nextPayment: number;
  paymentFrequency: string;
  benefitLabel: string;
  status: "Active" | "Completed" | "Needs Attention";
};

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export function SavingsCard({ plan }: { plan: SavingsPlan }) {
  const progress =
    plan.target > 0
      ? Math.min((plan.saved / plan.target) * 100, 100)
      : 0;

  const isChopBeta = plan.packageName === "Chop Beta";
  const Icon = isChopBeta ? ShoppingBasket : Store;

  return (
    <article className="flex flex-col justify-between gap-4 rounded-2xl border border-surface-container-high/70 bg-surface-container-lowest p-5 shadow-[0_4px_16px_-2px_rgba(0,77,58,0.06)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isChopBeta
                  ? "bg-surface-container text-primary-container"
                  : "bg-primary-fixed text-primary"
              }`}
            >
              <Icon className="h-[22px] w-[22px]" />
            </div>

            <div className="min-w-0">
              <h3 className="font-headline font-bold text-on-surface">
                {plan.packageName} — {plan.hands}{" "}
                {plan.hands === 1 ? "Hand" : "Hands"}
              </h3>
              <p className="mt-0.5 font-body text-xs text-outline">
                {plan.handsOnTrack} on track
                {plan.handsNeedingAttention > 0 &&
                  `, ${plan.handsNeedingAttention} need attention`}
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-surface-container px-2.5 py-1 font-label-xs text-[11px] font-bold text-on-secondary-fixed-variant">
            {plan.status}
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="mb-1 font-label-xs text-xs font-medium text-outline">
                Money Saved
              </p>
              <p className="font-currency-card text-xl font-bold text-primary">
                {naira(plan.saved)}
                <span className="ml-1 text-sm font-normal text-outline">
                  / {naira(plan.target)}
                </span>
              </p>
            </div>

            <span className="font-label-xs text-xs font-bold text-secondary">
              {plan.currentPeriod} of {plan.totalPeriods} {plan.periodLabel}
            </span>
          </div>

          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container-highest"
            role="progressbar"
            aria-label={`${plan.packageName} savings progress`}
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-secondary-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-surface-container-high pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 font-body text-xs text-on-surface-variant">
          {isChopBeta ? (
            <ShoppingBasket className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          ) : (
            <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          )}
          <span>
            Next auto-pay:{" "}
            <strong className="font-currency-card text-on-surface">
              {naira(plan.nextPayment)}/{plan.paymentFrequency}
            </strong>
            <span className="block text-outline">{plan.benefitLabel}</span>
          </span>
        </div>

        <Link
          href={`/savings/${plan.id}`}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full bg-surface px-4 font-label-xs text-xs font-bold text-primary hover:bg-surface-container"
        >
          View Savings
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}