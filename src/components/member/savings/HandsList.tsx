import type { SavingsPackage } from "./savings-types";
import { formatMoney, getPeriodLabel } from "./savings-utils";
import DueBreakdown from "./DueBreakdown";


import { AlertTriangle, CalendarClock, Clock, RotateCw } from "lucide-react";

type HandView = SavingsPackage["hands"][number];

const toNumber = (value: number | string | null | undefined) => Number(value ?? 0);

function getGroup(hand: HandView) {
  if (
    hand.status === "payment-missed" ||
    hand.missedCycles > 0 ||
    (hand.overdue?.cycles ?? 0) > 0
  ) {
    return "attention" as const;
  }
  if (hand.status === "pending-activation") return "pending" as const;
  if (hand.status === "on-track") return "active" as const;
  return "completed" as const;
}

const GROUPS = [
  { key: "attention", label: "Need attention", bar: "bg-error", dot: "bg-error" },
  { key: "pending", label: "Pending", bar: "bg-tertiary-fixed-dim", dot: "bg-tertiary-fixed-dim" },
  { key: "active", label: "On track", bar: "bg-primary", dot: "bg-primary" },
  { key: "completed", label: "Completed", bar: "bg-secondary", dot: "bg-secondary" },
] as const;

type Props = {
  savings: SavingsPackage;
  canRetry: boolean;
  canActivate: boolean;
  isRetrying?: boolean;
  isActivating?: boolean;
  onRetry: () => void;
  onActivate: () => void;
};

export default function HandsSummary({
  savings,
  canRetry,
  canActivate,
  isRetrying,
  isActivating,
  onRetry,
  onActivate,
}: Props) {
  const period = getPeriodLabel(savings.frequency);
  const total = savings.hands.length;

  const counts = { attention: 0, pending: 0, active: 0, completed: 0 };
  let totalSaved = 0;
  let completedPeriods = 0;
  let overdueAmount = 0;
  let overdueFees = 0;
  let nextAmount = 0;

  savings.hands.forEach((hand) => {
    counts[getGroup(hand)] += 1;
    totalSaved += toNumber(hand.savedAmount);
    completedPeriods += hand.completedPeriods ?? 0;
    if ((hand.overdue?.cycles ?? 0) > 0) {
      overdueAmount += toNumber(hand.overdue?.amount);
      overdueFees += toNumber(hand.overdue?.lateFee);
    }
    nextAmount += toNumber(hand.nextDue?.amount);
  });

  const possiblePeriods = total * savings.duration;
  const progress =
    possiblePeriods > 0 ? Math.min(100, Math.round((completedPeriods / possiblePeriods) * 100)) : 0;

  const hasOverdue = counts.attention > 0 && overdueAmount > 0;
  const hasNext = nextAmount > 0;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-body text-xs text-outline">Total saved</p>
          <p className="font-label-md text-lg font-bold text-on-surface">
            {formatMoney(totalSaved)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-body text-xs text-outline">Overall progress</p>
          <p className="font-label-md text-lg font-bold text-on-surface">{progress}%</p>
        </div>
      </div>

      {/* Status bar + legend */}
      <div className="space-y-2">
        <div
          className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-surface-container-high"
          role="img"
          aria-label={GROUPS.filter((g) => counts[g.key] > 0)
            .map((g) => `${counts[g.key]} ${g.label.toLowerCase()}`)
            .join(", ")}
        >
          {GROUPS.filter((g) => counts[g.key] > 0).map((g) => (
            <div
              key={g.key}
              className={g.bar}
              style={{ width: `${(counts[g.key] / total) * 100}%` }}
            />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {GROUPS.filter((g) => counts[g.key] > 0).map((g) => (
            <li key={g.key} className="flex items-center gap-1.5 font-body text-xs text-on-surface-variant">
              <span className={`h-2 w-2 rounded-full ${g.dot}`} />
              <span className="font-semibold text-on-surface">{counts[g.key]}</span> {g.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Overdue: action lives next to the problem */}
      {hasOverdue && (
        <div className="space-y-3 rounded-lg border border-error/20 bg-error-container/40 p-3">
          <div className="flex items-start gap-2 text-on-error-container">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="font-label-md text-sm font-bold">
                {counts.attention} {counts.attention === 1 ? "hand has" : "hands have"} a missed
                payment
              </p>
              <p className="font-body text-xs">
                Total overdue:{" "}
                <strong className="text-error">{formatMoney(overdueAmount)}</strong>
                {overdueFees > 0 && ` (includes ${formatMoney(overdueFees)} late fee)`}
              </p>
            </div>
          </div>
          {canRetry && (
            <button
              type="button"
              onClick={onRetry}
              disabled={isRetrying}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-error px-4 py-3 font-label-md text-sm font-bold text-on-error transition hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RotateCw size={16} aria-hidden="true" />
              {isRetrying ? "Retrying..." : "Retry missed payment"}
            </button>
          )}
        </div>
      )}

      {/* Pending activation: action lives next to the notice */}
      {counts.pending > 0 && (
        <div className="space-y-3 rounded-lg border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-3">
          <div className="flex items-start gap-2 text-on-surface">
            <Clock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="font-body text-xs">
              <strong>
                {counts.pending} {counts.pending === 1 ? "hand is" : "hands are"}
              </strong>{" "}
              waiting to be activated.
            </p>
          </div>
          {canActivate && (
            <button
              type="button"
              onClick={onActivate}
              disabled={isActivating}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-label-md text-sm font-bold text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isActivating ? "Activating..." : "Activate Pinnacle"}
            </button>
          )}
        </div>
      )}

      {/* Next payment */}
      {hasNext && (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-container-low px-3 py-2.5">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <CalendarClock size={14} aria-hidden="true" />
            <span className="font-body text-xs">
              Next payment{hasOverdue ? " (includes overdue)" : ""}
            </span>
          </div>
          <p className="font-label-md text-sm font-bold text-on-surface">
            {formatMoney(nextAmount)}
          </p>
        </div>
      )}
    </div>
  );
}