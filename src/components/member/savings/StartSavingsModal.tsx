"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type {
  NewSavingsSelection,
  SavingsProgram,
} from "./savings-types";
import type { Package } from "@/store/useAppStore";
import { formatMoney } from "./savings-utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (selection: NewSavingsSelection) => void;
  packages: Package[];
  selectedProgramType: Package["type"] | null;
  onSelectProgram: (packageType: Package["type"]) => void;
}

const handOptions = [1, 2, 3, 5, 10];

export default function StartSavingsModal({
  open,
  onClose,
  onSubmit,
  packages,
  selectedProgramType,
  onSelectProgram,
}: Props) {
  const [hands, setHands] = useState(1);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const selectedPackage = packages.find((item) => item.type === selectedProgramType) ?? packages[0];
  const program = selectedPackage?.name as SavingsProgram | undefined;
  const amount = Number(selectedPackage?.weeklyAmount ?? 0);
  const duration = selectedPackage?.durationWeeks ?? 0;
  const payment = amount * hands;
  const target = payment * duration;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-savings-title"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-2xl sm:p-6"
      >
        <header className="flex items-start justify-between gap-3 border-b border-surface-container-low pb-4">
          <div>
            <h2 id="start-savings-title" className="font-headline font-bold text-on-surface">
              Start Another Savings
            </h2>
            <p className="mt-1 font-body text-xs text-outline">
              Choose a package and how many hands you want.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-outline hover:bg-surface-container-low"
          >
            <X size={19} />
          </button>
        </header>

        <div className="space-y-5 py-5">
          <div>
            <p className="mb-2 font-label-xs text-xs font-bold uppercase tracking-wide text-on-surface-variant">
              1. Select package
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {packages.map((item) => {
                const selected = selectedPackage?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProgram(item.type)}
                    aria-pressed={selected}
                    className={`rounded-xl border-2 p-3 text-left transition ${
                      selected
                        ? "border-primary bg-surface"
                        : "border-surface-container-high hover:border-secondary-accent"
                    }`}
                  >
                    <span className={`block text-sm font-bold ${selected ? "text-primary" : "text-on-surface"}`}>
                      {item.name}
                    </span>
                    <span className="mt-1 block font-body text-[11px] text-on-surface-variant">
                      Weekly savings · {formatMoney(Number(item.weeklyAmount))} per hand
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 font-label-xs text-xs font-bold uppercase tracking-wide text-on-surface-variant">
              2. How many hands?
            </p>
            <div className="grid grid-cols-5 gap-2">
              {handOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setHands(value)}
                  aria-pressed={hands === value}
                  className={`rounded-lg border py-2 text-xs font-bold ${
                    hands === value
                      ? "border-primary bg-surface-container-low text-primary"
                      : "border-surface-container-high text-on-surface-variant hover:border-primary"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="mt-2 font-body text-[11px] text-outline">
              All hands in this package will share one batch and tracking code.
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-primary/20 bg-surface-container-low p-4 font-body text-xs">
            <SummaryRow label="Selected package" value={`${program ?? "No program selected"} (${hands} ${hands === 1 ? "Hand" : "Hands"})`} />
            <SummaryRow
              label="Weekly payment"
              value={`${formatMoney(payment)} (${hands} × ${formatMoney(amount)})`}
            />
            <SummaryRow label="Duration" value={`${duration} weeks`} />
            <div className="flex justify-between gap-3 border-t border-surface-container-low pt-2">
              <span className="text-on-surface-variant">Total target</span>
              <strong className="font-currency-card text-on-surface">{formatMoney(target)}</strong>
            </div>
            <p className="pt-1 font-body text-[11px] leading-relaxed text-outline">
              Payments are taken automatically from your Elevate Wallet.
              Make sure your wallet has enough money before the payment date.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-surface-container-low pt-4 sm:flex-row">
          <button
            onClick={onClose}
            className="min-h-11 rounded-xl bg-surface-container-low px-4 py-3 font-label-md text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high sm:flex-1"
          >
            Cancel
          </button>
          <button
            onClick={() => program && onSubmit({ program, hands })}
            disabled={!program}
            className="min-h-11 rounded-xl bg-primary px-4 py-3 font-label-md text-sm font-bold text-on-primary hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
          >
            Continue
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