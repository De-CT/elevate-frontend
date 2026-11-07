// components/member/dashboard/SavingsCard.tsx
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Clock3,
  RotateCw,
  Store,
  ShoppingBasket,
} from "lucide-react";

type SavingsPlan = {
  id: string;
  packageName: string;
  hands: number;
  handsOnTrack: number;
  handsNeedingAttention: number;
  overdueHands: number;
  saved: number;
  target: number;
  currentPeriod: number;
  totalPeriods: number;
  periodLabel: string;
  nextPayment: number;
  paymentFrequency: string;
  benefitLabel: string;
  registrationFeeDue: number;
  pendingHands: number;
  overdueTotal: number;
  overdueLateFees: number;
  nextPaymentDate?: string;
  status: "Active" | "Completed" | "Needs Attention" | "Pending Activation";
};

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const STATUS_STYLES: Record<SavingsPlan["status"], string> = {
  Active: "bg-surface-container text-on-secondary-fixed-variant",
  Completed: "bg-surface-container-high text-on-surface-variant",
  "Needs Attention": "border border-error/20 bg-error-container text-on-error-container",
  "Pending Activation": "bg-tertiary-fixed/40 text-on-surface",
};

export function SavingsCard({
  plan,
  onActivate,
  isActivating,
  onRetry,
  isRetrying,
}: {
  plan: SavingsPlan;
  onActivate: () => void;
  isActivating: boolean;
  onRetry: () => void;
  isRetrying: boolean;
}) {
  const progress = plan.target > 0 ? Math.min((plan.saved / plan.target) * 100, 100) : 0;

  const isChopBeta = plan.packageName === "Chop Beta";
  const Icon = isChopBeta ? ShoppingBasket : Store;
  const isPendingPlan = plan.status === "Pending Activation";
  const hasOverdue = plan.overdueHands > 0;
  const showActivate = plan.packageName === "Pinnacle" && plan.pendingHands > 0;

  const summaryParts = [
    isPendingPlan ? "Awaiting registration fee confirmation" : `${plan.handsOnTrack} on track`,
    ...(plan.handsNeedingAttention > 0 ? [`${plan.handsNeedingAttention} need attention`] : []),
  ];

  const nextDate = plan.nextPaymentDate
    ? new Date(plan.nextPaymentDate).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-surface-container-high/70 bg-surface-container-lowest p-5 shadow-[0_4px_16px_-2px_rgba(0,77,58,0.06)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isChopBeta
                ? "bg-surface-container text-primary-container"
                : "bg-primary-fixed text-primary"
            }`}
          >
            <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h3 className="font-headline font-bold text-on-surface">
              {plan.packageName} — {plan.hands} {plan.hands === 1 ? "Hand" : "Hands"}
            </h3>
            <p className="mt-0.5 font-body text-xs text-outline">{summaryParts.join(" · ")}</p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 font-label-xs text-[11px] font-bold ${STATUS_STYLES[plan.status]}`}
        >
          {plan.status}
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="mb-1 font-label-xs text-xs font-medium text-outline">Money Saved</p>
            <p className="font-currency-card text-xl font-bold text-primary">
              {naira(plan.saved)}
              <span className="ml-1 text-sm font-normal text-outline">/ {naira(plan.target)}</span>
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

      {/* Action needed: the button sits next to the reason for it */}
      {hasOverdue && (
        <div className="flex flex-col gap-3 rounded-xl border border-error/20 bg-error-container/40 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-on-error-container">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div className="min-w-0 font-body text-xs">
              <p className="font-bold">
                {plan.overdueHands} {plan.overdueHands === 1 ? "hand has" : "hands have"} a missed
                payment
              </p>
              <p>
                <strong className="font-currency-card text-sm text-error">
                  {naira(plan.overdueTotal)}
                </strong>{" "}
                overdue
                {plan.overdueLateFees > 0 && ` · includes ${naira(plan.overdueLateFees)} late fee`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-error px-4 font-label-xs text-xs font-bold text-on-error hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            {isRetrying ? "Retrying..." : "Retry payment"}
          </button>
        </div>
      )}

      {showActivate && (
        <div className="flex flex-col gap-3 rounded-xl border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-on-surface">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-tertiary" aria-hidden="true" />
            <p className="font-body text-xs">
              <strong>
                {plan.pendingHands} {plan.pendingHands === 1 ? "hand is" : "hands are"}
              </strong>{" "}
              waiting to be activated
            </p>
          </div>
          <button
            type="button"
            onClick={onActivate}
            disabled={isActivating}
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-primary px-4 font-label-xs text-xs font-bold text-on-primary hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isActivating ? "Activating..." : "Activate Pinnacle"}
          </button>
        </div>
      )}

      {/* Footer: next payment + single quiet link */}
      <div className=" gap-3 border-t border-surface-container-high pt-3">
        <div className="flex min-w-0 items-start gap-2 font-body text-xs text-on-surface-variant">
          <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <span>
            {plan.registrationFeeDue > 0 ? "Registration fee due: " : "Next contribution: "}
            <strong className="font-currency-card text-on-surface">
              {plan.registrationFeeDue > 0
                ? naira(plan.registrationFeeDue)
                : plan.nextPayment > 0
                  ? naira(plan.nextPayment)
                  : "Not scheduled"}
            </strong>
            {plan.registrationFeeDue === 0 && plan.nextPayment > 0 && (
              <span className="text-outline">
                {nextDate ? ` · ${nextDate}` : ` / ${plan.paymentFrequency}`}
                {hasOverdue && " · includes overdue"}
              </span>
            )}
            <span className="block text-outline">{plan.benefitLabel}</span>
          </span>
        </div>

        <Link
          href={`/savings/${plan.id}`}
          className="inline-flex mx-auto mt-4 min-h-10 shrink-0 w-full items-center justify-center gap-1 rounded-full bg-surface px-4 font-label-xs text-xs font-bold text-primary hover:bg-surface-container"
        >
          View details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}