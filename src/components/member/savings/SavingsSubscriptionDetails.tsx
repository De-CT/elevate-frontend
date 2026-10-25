"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { claimSubscription, getSubscription } from "@/backend/user";
import type { Subscription } from "@/types/subscription";
import { toSavingsPackage } from "@/utils/subscription-mapping";
import {
  formatMoney,
  getProgress,
  getSavedAmount,
  getTargetAmount,
} from "./savings-utils";

interface Props {
  subscriptionId: string;
}

export default function SavingsSubscriptionDetails({ subscriptionId }: Props) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadSubscription = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      setSubscription(await getSubscription(subscriptionId));
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Unable to load this savings plan.");
    } finally {
      setIsLoading(false);
    }
  }, [subscriptionId]);

  useEffect(() => {
    void loadSubscription();
  }, [loadSubscription]);

  const handleActivate = async () => {
    if (!subscription) return;
    setIsActivating(true);
    setActionError(null);
    try {
      if (subscription.hands.length > 1) {
        await claimSubscription({ groupId: subscription.id });
      } else {
        await claimSubscription({ subscriptionId: subscription.id });
      }
      await loadSubscription();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to activate this savings plan.");
    } finally {
      setIsActivating(false);
    }
  };

  const savings = subscription ? toSavingsPackage(subscription) : null;
  const canActivate =
    subscription?.package.type === "PINNACLE" &&
    subscription.hands.some((hand) => hand.status === "PENDING_ACTIVATION");
  const saved = savings ? getSavedAmount(savings) : 0;
  const target = savings ? getTargetAmount(savings) : 0;
  const progress = savings ? getProgress(savings) : 0;

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
          <header className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-headline text-2xl font-bold text-primary">
                  {subscription.package.name}
                </h1>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {savings.hands.length} {savings.hands.length === 1 ? "hand" : "hands"} ·{" "}
                  {subscription.package.occurrence.toLowerCase()} contributions ·{" "}
                  {subscription.package.duration}{" "}
                  {subscription.package.occurrence === "MONTHLY" ? "months" : "weeks"}
                </p>
              </div>
              <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-semibold text-primary">
                {savings.status === "pending-activation"
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
                  of {formatMoney(target)}
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
                <div className="h-full rounded-full bg-secondary-accent" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </header>

          <section className="grid gap-3 sm:grid-cols-2">
            <Summary
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
                    ? `Due ${new Date(savings.nextPaymentDate).toLocaleDateString("en-NG")}`
                    : "Your savings schedule is up to date."
              }
            />
            <Summary
              label="Progress"
              value={`${savings.completedPeriods} of ${savings.duration} ${
                savings.frequency === "Monthly" ? "months" : "weeks"
              }`}
              detail={`${formatMoney(savings.handAmount)} per hand, per ${
                savings.frequency === "Monthly" ? "month" : "week"
              }`}
            />
          </section>

          {canActivate && (
            <section className="flex flex-col gap-3 rounded-2xl border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Claim the Pinnacle registration to activate your hands. Contributions will be
                  debited from your wallet automatically when funds are available.
                </p>
              </div>
              <button
                type="button"
                onClick={() => void handleActivate()}
                disabled={isActivating}
                className="min-h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-bold text-on-primary hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
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

          <section className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 sm:p-6">
            <h2 className="font-headline text-lg font-bold text-primary">Your hands</h2>
            <ul className="mt-3 divide-y divide-surface-container-low">
              {savings.hands.map((hand) => {
                const pending = hand.status === "pending-activation";
                const missed = hand.status === "payment-missed";
                const label = pending ? "Awaiting activation" : missed ? "Payment missed" : hand.status === "completed" ? "Completed" : "Active";
                return (
                  <li key={hand.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-2 last:pb-1">
                    <div>
                      <p className="font-semibold text-on-surface">Hand {hand.handNumber}</p>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {hand.completedPeriods} of {savings.duration} periods complete
                        {hand.missedCycles > 0 ? ` · ${hand.missedCycles} missed` : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-on-surface-variant">
                        {!pending && <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />}
                        {label}
                      </span>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {formatMoney(hand.savedAmount)} saved
                      </p>
                      {hand.nextDue && (
                        <p className="mt-1 text-xs text-on-surface-variant">
                          Next due: {formatMoney(Number(hand.nextDue.amount))}
                          {Number(hand.nextDue.lateFee) > 0
                            ? ` + ${formatMoney(Number(hand.nextDue.lateFee))} late fee`
                            : ""}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      ) : null}
    </main>
  );
}

function Summary({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-4">
      <p className="text-xs text-on-surface-variant">{label}</p>
      <p className="mt-1 font-headline text-lg font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs text-on-surface-variant">{detail}</p>
    </div>
  );
}
