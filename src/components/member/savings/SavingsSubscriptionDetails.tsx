"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  ChevronDown,
  Clock3,
  RotateCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { claimSubscription, getSubscription, retryOverDuePayment } from "@/backend/user";
import type { Subscription } from "@/types/subscription";
import type { SavingsPackage } from "./savings-types";
import { toSavingsPackage } from "@/utils/subscription-mapping";
import ReferralCodeSection from "./ReferralCodeSection";
import {
  formatMoney,
  getProgress,
  getSavedAmount,
  getTargetAmount,
} from "./savings-utils";

interface Props {
  subscriptionId: string;
}

type HandView = SavingsPackage["hands"][number];
type Group = "attention" | "pending" | "active" | "completed";
type Filter = "all" | Group;

const INITIAL_VISIBLE = 6;
const AUTO_EXPAND_MAX = 3;

const toNumber = (value: number | string | null | undefined) => Number(value ?? 0);

const GROUP_META: Record<
  Group,
  { rank: number; label: string; filterLabel: string; pill: string; bar: string }
> = {
  attention: {
    rank: 0,
    label: "Payment missed",
    filterLabel: "Needs attention",
    pill: "border border-error/20 bg-error-container text-on-error-container",
    bar: "bg-error",
  },
  pending: {
    rank: 1,
    label: "Awaiting activation",
    filterLabel: "Pending",
    pill: "bg-tertiary-fixed/40 text-on-surface",
    bar: "bg-tertiary-fixed-dim",
  },
  active: {
    rank: 2,
    label: "Active",
    filterLabel: "Active",
    pill: "bg-secondary-container text-on-secondary-fixed-variant",
    bar: "bg-primary",
  },
  completed: {
    rank: 3,
    label: "Completed",
    filterLabel: "Completed",
    pill: "bg-surface-container-high text-on-surface-variant",
    bar: "bg-secondary",
  },
};

function getGroup(hand: HandView): Group {
  if (
    hand.status === "payment-missed" ||
    hand.missedCycles > 0 ||
    (hand.overdue?.cycles ?? 0) > 0
  ) {
    return "attention";
  }
  if (hand.status === "pending-activation") return "pending";
  if (hand.status === "on-track") return "active";
  return "completed";
}

export default function SavingsSubscriptionDetails({ subscriptionId }: Props) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadSubscription = useCallback(async () => {
    try {
      const result = await getSubscription(subscriptionId);
      setLoadError(null);
      setSubscription(result);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load this savings plan.");
    } finally {
      setIsLoading(false);
    }
  }, [subscriptionId]);

  useEffect(() => {
    let active = true;

    getSubscription(subscriptionId)
      .then((result) => {
        if (!active) return;
        setLoadError(null);
        setSubscription(result);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load this savings plan."
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [subscriptionId]);

  const handleActivate = async () => {
    if (!subscription) return;
    setIsActivating(true);
    setActionError(null);
    try {
      await claimSubscription({ subscriptionId: subscription.id });
      await loadSubscription();
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Unable to activate this savings plan."
      );
    } finally {
      setIsActivating(false);
    }
  };

  const handleRetryOverduePayment = async () => {
    if (!subscription) return;
    setIsRetrying(true);
    setActionError(null);
    try {
      await retryOverDuePayment(subscription.id);
      toast.success("Missed payment retry submitted.");
      await loadSubscription();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to retry the missed payment.";
      setActionError(message);
      toast.error(message);
    } finally {
      setIsRetrying(false);
    }
  };

  const savings = subscription ? toSavingsPackage(subscription) : null;
  const canActivate =
    subscription?.package.type === "PINNACLE" &&
    subscription.hands.some((hand) => hand.status === "PENDING_ACTIVATION");
  const saved = savings ? getSavedAmount(savings) : 0;
  const target = savings ? getTargetAmount(savings) : 0;
  const progress = savings ? getProgress(savings) : 0;

  // Package-wide overdue totals
  let overdueHandCount = 0;
  let overdueAmount = 0;
  let overdueFees = 0;
  let pendingCount = 0;
  savings?.hands.forEach((hand) => {
    if ((hand.overdue?.cycles ?? 0) > 0) {
      overdueHandCount += 1;
      overdueAmount += toNumber(hand.overdue?.amount);
      overdueFees += toNumber(hand.overdue?.lateFee);
    }
    if (hand.status === "pending-activation") pendingCount += 1;
  });
  const hasOverdue = overdueHandCount > 0;

  const isMonthly = savings?.frequency === "Monthly";
  const periodLabel = isMonthly ? "months" : "weeks";

  if (isLoading && !subscription) {
    return <FullScreenLoader label="Loading your savings details..." />;
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-5 px-4 py-6 sm:px-6 lg:py-10">
      <Link
        href="/savings"
        className="inline-flex items-center gap-2 font-label-md text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        All savings
      </Link>

      {loadError && !subscription ? (
        <section className="space-y-4 rounded-2xl border border-error/20 bg-surface-container-lowest p-6">
          <p role="alert" className="text-sm text-error">{loadError}</p>
          <button
            type="button"
            onClick={() => void loadSubscription()}
            className="min-h-10 rounded-full bg-primary px-5 text-sm font-semibold text-on-primary"
          >
            Try again
          </button>
        </section>
      ) : subscription && savings ? (
        <>
          {/* Header */}
          <header className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-headline text-2xl font-bold text-primary">
                  {subscription.package.name}
                </h1>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {savings.hands.length} {savings.hands.length === 1 ? "hand" : "hands"} ·{" "}
                  {subscription.package.occurrence.toLowerCase()} contributions ·{" "}
                  {subscription.package.duration} {periodLabel}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  hasOverdue
                    ? "border border-error/20 bg-error-container text-on-error-container"
                    : "bg-surface-container text-primary"
                }`}
              >
                {hasOverdue
                  ? "Payment missed"
                  : savings.status === "pending-activation"
                    ? "Pending activation"
                    : savings.status === "completed"
                      ? "Completed"
                      : "Active"}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-on-surface-variant">Saved so far</p>
                  <p className="mt-1 font-currency-card text-2xl font-bold text-primary">
                    {formatMoney(saved)}
                  </p>
                </div>
                <p className="text-right text-xs text-on-surface-variant">
                  of {formatMoney(target)} · {progress}%
                </p>
              </div>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-surface-container-high"
                role="progressbar"
                aria-label="Savings progress"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-secondary-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </header>

          <ReferralCodeSection referral={subscription.referral} />

          {/* Actions needed (only when relevant) */}
          {hasOverdue && (
            <section className="space-y-4 rounded-2xl border border-error/20 bg-error-container/50 p-5">
              <div className="flex items-start gap-3 text-on-error-container">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <h2 className="font-headline text-base font-bold">
                    {overdueHandCount} {overdueHandCount === 1 ? "hand has" : "hands have"} a missed
                    payment
                  </h2>
                  <p className="mt-1 text-sm">
                    Add funds to your wallet, then retry the missed payment.
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 rounded-xl bg-surface-container-lowest/70 px-4 py-3">
                <p className="text-sm text-on-surface-variant">Total overdue</p>
                <div className="text-right">
                  <p className="font-currency-card text-xl font-bold text-error">
                    {formatMoney(overdueAmount)}
                  </p>
                  {overdueFees > 0 && (
                    <p className="text-xs text-on-error-container">
                      Includes {formatMoney(overdueFees)} late fee
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => void handleRetryOverduePayment()}
                disabled={isRetrying}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-error px-5 text-sm font-bold text-on-error hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RotateCw className="h-4 w-4" aria-hidden="true" />
                {isRetrying ? "Retrying..." : "Retry missed payment"}
              </button>
            </section>
          )}

          {canActivate && (
            <section className="space-y-4 rounded-2xl border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-5">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" aria-hidden="true" />
                <div className="min-w-0">
                  <h2 className="font-headline text-base font-bold text-on-surface">
                    {pendingCount} {pendingCount === 1 ? "hand is" : "hands are"} waiting to be
                    activated
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                    Claim the Pinnacle registration to activate your hands. Contributions will be
                    debited from your wallet automatically when funds are available.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void handleActivate()}
                disabled={isActivating}
                className="min-h-11 w-full rounded-full bg-primary px-5 text-sm font-bold text-on-primary hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isActivating ? "Activating..." : "Activate Pinnacle"}
              </button>
            </section>
          )}

          {actionError && (
            <p role="alert" className="rounded-xl bg-error-container p-3 text-sm text-on-error-container">
              {actionError}
            </p>
          )}
          {loadError && (
            <p role="alert" className="rounded-xl bg-error-container p-3 text-sm text-on-error-container">
              Details could not be refreshed: {loadError}
            </p>
          )}

          {/* Summary cards */}
          <section className="grid gap-3 sm:grid-cols-2">
            <Summary
              icon={<CalendarClock className="h-4 w-4" aria-hidden="true" />}
              label={savings.registrationFeeDue > 0 ? "Registration fee due" : "Next contribution"}
              value={
                savings.registrationFeeDue > 0
                  ? formatMoney(savings.registrationFeeDue)
                  : savings.nextPaymentAmount > 0
                    ? formatMoney(savings.nextPaymentAmount)
                    : "Not scheduled"
              }
              detail={
                savings.registrationFeeDue > 0
                  ? "Hands start after the registration payment is confirmed."
                  : savings.nextPaymentDate
                    ? `Due ${new Date(savings.nextPaymentDate).toLocaleDateString("en-NG")}${
                        hasOverdue ? " · includes overdue balance" : ""
                      }`
                    : "Your savings schedule is up to date."
              }
            />
            <Summary
              label="Progress"
              value={`${savings.completedPeriods} of ${savings.duration} ${periodLabel}`}
              detail={`${formatMoney(savings.handAmount)} per hand, per ${isMonthly ? "month" : "week"}`}
            />
          </section>

          {/* Hands */}
          <HandsSection savings={savings} periodLabel={periodLabel} />
        </>
      ) : null}
    </main>
  );
}

function HandsSection({
  savings,
  periodLabel,
}: {
  savings: SavingsPackage;
  periodLabel: string;
}) {
  const total = savings.hands.length;
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(total <= AUTO_EXPAND_MAX ? savings.hands.map((h) => h.id) : [])
  );

  // Needs attention first, then pending, active, completed
  const sorted = useMemo(
    () =>
      [...savings.hands].sort(
        (a, b) =>
          GROUP_META[getGroup(a)].rank - GROUP_META[getGroup(b)].rank ||
          a.handNumber - b.handNumber
      ),
    [savings.hands]
  );

  const counts = useMemo(() => {
    const c: Record<Group, number> = { attention: 0, pending: 0, active: 0, completed: 0 };
    sorted.forEach((h) => {
      c[getGroup(h)] += 1;
    });
    return c;
  }, [sorted]);

  const filtered = filter === "all" ? sorted : sorted.filter((h) => getGroup(h) === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - visible.length;

  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setShowAll(false);
  };

  const filterOptions: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: total },
    ...(Object.keys(GROUP_META) as Group[])
      .filter((g) => counts[g] > 0)
      .map((g) => ({ key: g, label: GROUP_META[g].filterLabel, count: counts[g] })),
  ];

  return (
    <section className="space-y-4 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-headline text-lg font-bold text-primary">Your hands</h2>
        <span className="text-xs text-on-surface-variant">{total} total</span>
      </div>

      {total > INITIAL_VISIBLE && filterOptions.length > 2 && (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {filterOptions.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => changeFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filter === f.key
                  ? f.key === "attention"
                    ? "bg-error text-on-error"
                    : "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {f.label} · {f.count}
            </button>
          ))}
        </div>
      )}

      <ul className="space-y-2">
        {visible.map((hand) => (
          <HandRow
            key={hand.id}
            hand={hand}
            duration={savings.duration}
            periodLabel={periodLabel}
            expanded={expandedIds.has(hand.id)}
            onToggle={() => toggle(hand.id)}
          />
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full rounded-xl border border-surface-container-high py-2.5 text-sm font-bold text-primary transition hover:bg-surface-container-high"
        >
          Show all {filtered.length} hands ({hiddenCount} more)
        </button>
      )}
      {showAll && filtered.length > INITIAL_VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll(false)}
          className="w-full py-2 text-xs font-semibold text-outline hover:text-on-surface"
        >
          Show less
        </button>
      )}
    </section>
  );
}

function HandRow({
  hand,
  duration,
  periodLabel,
  expanded,
  onToggle,
}: {
  hand: HandView;
  duration: number;
  periodLabel: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const group = getGroup(hand);
  const meta = GROUP_META[group];
  const overdue = hand.overdue && hand.overdue.cycles > 0 ? hand.overdue : null;
  const progress =
    duration > 0 ? Math.min(100, Math.round((hand.completedPeriods / duration) * 100)) : 0;
  const panelId = `hand-panel-${hand.id}`;

  return (
    <li className="rounded-xl border border-surface-container-high bg-surface-container-lowest">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="w-full rounded-xl p-3 text-left transition hover:bg-surface-container-low/60 sm:p-4"
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-bold text-on-surface">Hand {hand.handNumber}</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.pill}`}>
                {meta.label}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-on-surface-variant">
              {overdue ? (
                <span className="font-semibold text-error">
                  {formatMoney(toNumber(overdue.amount))} overdue
                </span>
              ) : (
                <>
                  {hand.completedPeriods} of {duration} {periodLabel}
                </>
              )}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-on-surface">{formatMoney(hand.savedAmount)}</p>
            <p className="text-[11px] text-outline">saved</p>
          </div>

          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`shrink-0 text-outline transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>

        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Hand ${hand.handNumber} progress`}
        >
          <div
            className={`h-full rounded-full transition-all ${meta.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </button>

      {expanded && (
        <div id={panelId} className="space-y-3 border-t border-surface-container-high p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-on-surface-variant">
            <p>
              <span className="font-semibold text-on-surface">
                {hand.completedPeriods} of {duration}
              </span>{" "}
              {periodLabel} completed
              {overdue && (
                <span className="font-semibold text-error"> · {overdue.cycles} missed</span>
              )}
            </p>
            {(hand.activatedAt || hand.maturedAt) && (
              <p className="text-[11px] text-outline">
                {hand.activatedAt &&
                  `Activated ${new Date(hand.activatedAt).toLocaleDateString("en-NG")}`}
                {hand.activatedAt && hand.maturedAt && " · "}
                {hand.maturedAt &&
                  `Matured ${new Date(hand.maturedAt).toLocaleDateString("en-NG")}`}
              </p>
            )}
          </div>

          {overdue && (
            <div className="rounded-lg border border-error/20 bg-error-container/40 p-3">
              <div className="flex items-end justify-between gap-3">
                <div className="flex items-center gap-2 text-on-error-container">
                  <AlertTriangle size={14} aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-wide">
                    Overdue{overdue.cycles > 1 ? ` (${overdue.cycles} cycles)` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-error">
                    {formatMoney(toNumber(overdue.amount))}
                  </p>
                  {toNumber(overdue.lateFee) > 0 && (
                    <p className="text-[11px] text-on-error-container">
                      Includes {formatMoney(toNumber(overdue.lateFee))} late fee
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {hand.nextDue && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-surface-container-low px-3 py-2.5">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <CalendarClock size={14} aria-hidden="true" />
                <span className="text-xs">Next payment</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface">
                  {formatMoney(toNumber(hand.nextDue.amount))}
                </p>
                {toNumber(hand.nextDue.lateFee) > 0 && (
                  <p className="text-[11px] text-outline">
                    Includes {formatMoney(toNumber(hand.nextDue.lateFee))} late fee
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

function Summary({
  icon,
  label,
  value,
  detail,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4">
      <div className="flex items-center gap-1.5 text-on-surface-variant">
        {icon}
        <p className="text-xs">{label}</p>
      </div>
      <p className="mt-1 font-headline text-lg font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{detail}</p>
    </div>
  );
}