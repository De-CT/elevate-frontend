import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { SavingsPackage } from "./savings-types";
import {
  formatMoney,
  getNextPayment,
  getPeriodLabel,
  getProgress,
  getSavedAmount,
  getTargetAmount,
} from "./savings-utils";
import SavingsProgress from "./SavingsProgress";
import HandsList from "./HandsList";

interface Props {
  savings: SavingsPackage;
  onView: (item: SavingsPackage) => void;
  onActivate: (item: SavingsPackage) => void;
  isActivating: boolean;
}

export default function SavingsCard({ savings, onView, onActivate, isActivating }: Props) {
  const saved = getSavedAmount(savings);
  const target = getTargetAmount(savings);
  const missedCount = savings.hands.filter((hand) => hand.status === "payment-missed").length;
  const pendingActivationCount = savings.hands.filter(
    (hand) => hand.status === "pending-activation"
  ).length;
  const canActivate = savings.name === "Pinnacle" && pendingActivationCount > 0;
  const onTrackCount = savings.hands.filter((hand) => hand.status === "on-track").length;
  const statusLabel =
    savings.status === "pending-activation" ? "Pending activation" : savings.status;

  return (
    <article className="space-y-4 rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <header className="flex flex-col justify-between gap-3 border-b border-surface-container-low pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                savings.name === "Pinnacle" ? "bg-primary" : "bg-secondary-accent"
              }`}
            />
            <h2 className="font-headline text-lg font-bold text-on-surface">
              {savings.name} — {savings.hands.length}{" "}
              {savings.hands.length === 1 ? "Hand" : "Hands"}
            </h2>
          </div>
          <p className="mt-1 font-body text-xs text-outline">
            {pendingActivationCount > 0
              ? `${pendingActivationCount} ${pendingActivationCount === 1 ? "hand" : "hands"} awaiting registration fee confirmation`
              : `${savings.frequency} savings for ${savings.name === "Pinnacle" ? "your goals" : "household food security"}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-primary/20 bg-surface-container-low px-3 py-1 font-label-xs text-xs font-bold text-primary">
            {savings.hands.length} Hands
          </span>
          <span className="rounded-full bg-secondary-container px-3 py-1 font-label-xs text-xs font-bold capitalize text-on-secondary-fixed-variant">
            {statusLabel}
          </span>
        </div>
      </header>

      <SavingsProgress savings={savings} />

      {savings.registrationFeeDue > 0 && (
        <p className="rounded-lg border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-3 font-body text-sm text-on-surface">
          Registration fee due:{" "}
          <strong>{formatMoney(savings.registrationFeeDue)}</strong>. Hands activate after
          payment confirmation.
        </p>
      )}

      <section className="space-y-3 rounded-xl border border-surface-container-high bg-surface-container-low p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-label-xs text-xs font-bold uppercase tracking-wide text-on-surface-variant">
            Hands in this package
          </h3>

          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              missedCount
                ? "border border-error/20 bg-error-container text-on-error-container"
                : "bg-secondary-container text-on-secondary-fixed-variant"
            }`}
          >
            {missedCount
              ? `${onTrackCount} on track · ${missedCount} need attention${pendingActivationCount > 0 ? ` · ${pendingActivationCount} pending` : ""}`
              : pendingActivationCount > 0
                ? `${onTrackCount} active · ${pendingActivationCount} pending`
                : `${onTrackCount} of ${savings.hands.length} on track`}
          </span>
        </div>

        <HandsList savings={savings} />
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 font-body text-xs text-outline">
          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-secondary" />
          <span>
            {savings.status === "pending-activation"
              ? "Contribution payments begin after your registration fee is confirmed."
              : "Payments are taken automatically from your Elevate Wallet."}
            {savings.benefit ? ` ${savings.benefit}.` : ""}
          </span>
        </div>

        <button
          onClick={() => onView(savings)}
          className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 font-label-md text-sm font-bold transition ${
            canActivate
              ? "border border-primary/30 bg-surface-container-low text-primary hover:bg-surface-container-high"
              : "bg-primary text-on-primary hover:bg-primary-container"
          }`}
        >
          View Hands <ArrowRight size={16} />
        </button>
        {canActivate && (
          <button
            type="button"
            onClick={() => onActivate(savings)}
            disabled={isActivating}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-label-md text-sm font-bold text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isActivating ? "Activating..." : "Activate Pinnacle"}
          </button>
        )}
      </div>

      <div className="hidden">
        {formatMoney(saved)} {formatMoney(target)} {formatMoney(getNextPayment(savings))}
        {getProgress(savings)} {getPeriodLabel(savings.frequency)}
      </div>
    </article>
  );
}