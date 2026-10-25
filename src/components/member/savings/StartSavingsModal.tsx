"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Minus, Plus, X } from "lucide-react";
import type { NewSavingsSelection } from "./savings-types";
import type { Package } from "@/store/useAppStore";
import { formatMoney } from "./savings-utils";
import {
  formatPackageDuration,
  getOccurrenceAdjective,
} from "@/utils/package-format";

interface Props {
  open: boolean;
  isSubmitting: boolean;
  isSelectionLocked: boolean;
  onClose: () => void;
  onSubmit: (selection: NewSavingsSelection) => Promise<void>;
  submitError: string | null;
  packages: Package[];
  selectedProgramType: Package["type"] | null;
  onSelectProgram: (packageType: Package["type"]) => void;
}

export default function StartSavingsModal({
  open,
  isSubmitting,
  isSelectionLocked,
  onClose,
  onSubmit,
  submitError,
  packages,
  selectedProgramType,
  onSelectProgram,
}: Props) {
  const [handsInput, setHandsInput] = useState("1");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, isSubmitting]);

  const selectedPackage = packages.find((item) => item.type === selectedProgramType) ?? packages[0];
  const program = selectedPackage?.name;
  const amount = Number(selectedPackage?.contributionAmount ?? 0);
  const duration = selectedPackage?.duration ?? 0;
  const occurrence = selectedPackage?.occurrence;
  const occurrenceAdjective = getOccurrenceAdjective(occurrence);
  const isPinnacle = selectedPackage?.type === "PINNACLE";
  const parsedHands = Number(handsInput);
  const hands = Number.isSafeInteger(parsedHands) && parsedHands >= 1 ? parsedHands : null;
  const handsCount = hands ?? 0;
  const payment = amount * handsCount;
  const target = payment * duration;
  const registrationFee = Number(selectedPackage?.registrationFee ?? 0) * handsCount;
  const clearanceFee = Number(selectedPackage?.clearanceFee ?? 0) * handsCount;
  const referralBonus = Number(selectedPackage?.referralBonus ?? 0) * handsCount;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (!isSubmitting && event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-savings-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-2xl sm:p-7"
      >
        <header className="flex items-start justify-between gap-3 border-b border-surface-container-low pb-4">
          <div>
            <h2 id="start-savings-title" className="font-headline font-bold text-on-surface">
              Start Another Savings
            </h2>
            <p className="mt-1 font-body text-xs text-outline">Pick a plan and set the number of hands.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            disabled={isSubmitting}
            className="rounded-lg p-2 text-outline hover:bg-surface-container-low"
          >
            <X size={19} />
          </button>
        </header>

        <div className="space-y-5 py-5">
          <div>
            <p className="mb-2 font-label-xs text-xs font-bold uppercase tracking-wide text-on-surface-variant">
              1. Select a program
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {packages.map((item) => {
                const selected = selectedPackage?.id === item.id;
                const itemIsPinnacle = item.type === "PINNACLE";
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProgram(item.type)}
                    disabled={isSubmitting || isSelectionLocked}
                    aria-pressed={selected}
                    className={`relative flex flex-col rounded-2xl border-2 p-5 text-left transition ${
                      selected
                        ? itemIsPinnacle
                          ? "border-primary-container shadow-sm"
                          : "border-tertiary shadow-sm"
                        : "border-surface-container hover:border-secondary-accent"
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className={`font-headline text-xl font-bold ${itemIsPinnacle ? "text-primary" : "text-tertiary"}`}>
                        {item.name}
                      </span>
                      <span className="rounded-full bg-surface-container-low px-3 py-1 font-headline text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
                        {itemIsPinnacle ? "Cash Plan" : "Food Plan"}
                      </span>
                    </span>
                    <span className="mt-2 font-body text-sm text-on-surface-variant">
                      {getOccurrenceAdjective(item.occurrence)} contribution ·{" "}
                      {formatMoney(Number(item.contributionAmount))} per hand
                    </span>
                    <span className="mt-1 font-body text-xs text-outline">
                      {formatPackageDuration(item.duration, item.occurrence)} · Registration fee{" "}
                      {Number(item.registrationFee) > 0
                        ? formatMoney(Number(item.registrationFee))
                        : "free"}
                    </span>
                    {selected && (
                      <CheckCircle2
                        className={`absolute bottom-4 right-4 h-5 w-5 ${itemIsPinnacle ? "text-primary" : "text-tertiary"}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-surface-container bg-surface-container-low p-5">
              <label htmlFor="savings-hands" className="block font-headline text-sm font-bold text-primary">
                2. How many hands?
              </label>
              <p className="mt-1 font-body text-xs text-on-surface-variant">
                Enter the number of {program ?? "program"} hands you want.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHandsInput(String(Math.max(1, (hands ?? 1) - 1)))}
                  disabled={isSubmitting || isSelectionLocked || hands === 1}
                  aria-label="Remove one hand"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-surface-container bg-surface-container-lowest text-primary disabled:opacity-50"
                >
                  <Minus size={18} />
                </button>
                <input
                  id="savings-hands"
                  type="number"
                  min={1}
                  step={1}
                  inputMode="numeric"
                  value={handsInput}
                  disabled={isSubmitting || isSelectionLocked}
                  onChange={(event) => setHandsInput(event.target.value)}
                  aria-invalid={hands === null}
                  aria-describedby="savings-hands-help"
                  className="h-11 min-w-0 flex-1 rounded-lg border-2 border-primary-container bg-surface-container-lowest text-center font-headline text-xl font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setHandsInput(String((hands ?? 0) + 1))}
                  disabled={isSubmitting || isSelectionLocked}
                  aria-label="Add one hand"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-surface-container bg-surface-container-lowest text-primary disabled:opacity-50"
                >
                  <Plus size={18} />
                </button>
              </div>
              <p id="savings-hands-help" className="mt-2 font-body text-xs text-on-surface-variant">
                {hands === null ? "Enter a positive whole number of hands." : " "}
              </p>
            </div>

            <div className="rounded-2xl border border-surface-container bg-surface-container-low p-5">
              <p className="font-headline text-sm font-bold text-primary">Your contribution summary</p>
              <div className="mt-3 space-y-2 text-sm">
                <SummaryRow
                  label={`${occurrenceAdjective[0].toUpperCase()}${occurrenceAdjective.slice(1)} contribution`}
                  value={
                    hands === null
                      ? "—"
                      : `${formatMoney(payment)} (${hands} × ${formatMoney(amount)})`
                  }
                />
                <SummaryRow label="Duration" value={formatPackageDuration(duration, occurrence)} />
                <SummaryRow
                  label="Registration fee"
                  value={hands === null ? "—" : registrationFee > 0 ? formatMoney(registrationFee) : "Free"}
                />
                {isPinnacle && (
                  <>
                    <SummaryRow label="Clearance fee" value={hands === null ? "—" : formatMoney(clearanceFee)} />
                    <SummaryRow label="Potential referral bonus" value={hands === null ? "—" : formatMoney(referralBonus)} />
                  </>
                )}
                <div className="flex justify-between gap-3 border-t border-surface-container pt-2">
                  <span className="font-semibold text-on-surface-variant">Total contribution</span>
                  <strong className="font-currency-card text-on-surface">
                    {hands === null ? "—" : formatMoney(target)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          {submitError && (
            <p role="alert" className="rounded-lg bg-error-container p-3 text-sm text-on-error-container">
              {submitError}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-surface-container-low pt-4 sm:flex-row">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="min-h-11 rounded-xl bg-surface-container-low px-4 py-3 font-label-md text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high sm:flex-1"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedPackage && hands !== null) {
                void onSubmit({ packageType: selectedPackage.type, hands });
              }
            }}
            disabled={!selectedPackage || hands === null || isSubmitting}
            className="min-h-11 rounded-xl bg-primary px-4 py-3 font-label-md text-sm font-bold text-on-primary hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
          >
            {isSubmitting ? "Processing..." : "Continue"}
          </button>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-on-surface-variant">{label}</span>
      <strong className="text-right text-on-surface">{value}</strong>
    </div>
  );
}