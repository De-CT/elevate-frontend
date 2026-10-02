"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { SavingsPackage } from "./savings-types";
import {
  formatMoney,
  getNextPayment,
  getProgress,
  getSavedAmount,
  getTargetAmount,
} from "./savings-utils";
import HandsList from "./HandsList";

interface Props {
  savings: SavingsPackage | null;
  onClose: () => void;
}

export default function SavingsDetailsModal({ savings, onClose }: Props) {
  useEffect(() => {
    if (!savings) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [savings, onClose]);

  if (!savings) return null;

  const saved = getSavedAmount(savings);
  const target = getTargetAmount(savings);
  const progress = getProgress(savings);

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
        aria-labelledby="savings-details-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-2xl sm:p-6"
      >
        <header className="flex items-start justify-between gap-4 border-b border-surface-container-low pb-4">
          <div>
            <h2 id="savings-details-title" className="font-headline text-base font-bold text-on-surface">
              {savings.name} — {savings.hands.length}{" "}
              {savings.hands.length === 1 ? "Hand" : "Hands"}
            </h2>
            <p className="mt-1 font-body text-xs text-outline">
              Package details and progress
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="rounded-lg p-2 text-outline hover:bg-surface-container-low"
          >
            <X size={19} />
          </button>
        </header>

        <div className="space-y-4 py-4">
          <div className="rounded-xl bg-surface-container-low p-4 text-center">
            <p className="font-label-xs text-xs text-outline">Total saved across hands</p>
            <p className="mt-1 font-currency-card text-2xl font-bold text-primary">
              {formatMoney(saved)}
            </p>
            <p className="mt-1 font-body text-xs text-on-surface-variant">
              Target: {formatMoney(target)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <Detail label="Progress" value={`${progress}%`} />
            <Detail
              label="Completed"
              value={`${savings.completedPeriods} of ${savings.duration} ${
                savings.frequency === "Weekly" ? "weeks" : "months"
              }`}
            />
            <Detail label="Next payment" value={formatMoney(getNextPayment(savings))} />
            <Detail label="Next payment date" value={savings.nextPaymentDate ?? "Not available"} />
            <Detail label="Status" value={savings.status} />
            <Detail label="Batch code" value={savings.batchCode} />
          </div>

          <div className="space-y-2 border-t border-surface-container-low pt-4">
            <h3 className="font-headline text-sm font-bold text-on-surface">Your hands</h3>
            <HandsList savings={savings} />
          </div>

          <p className="rounded-lg bg-surface-container-low p-3 font-body text-xs leading-relaxed text-on-surface-variant">
            Payments are normally taken automatically from your Elevate Wallet.
            If a payment is missed, check the payment details in your account
            before making a manual recovery payment.
          </p>
        </div>

        <button
          onClick={onClose}
          className="min-h-11 w-full rounded-xl bg-primary px-4 py-3 font-label-md text-sm font-bold text-on-primary hover:bg-primary-container"
        >
          Close
        </button>
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-surface-container-low p-3">
      <p className="font-label-xs text-outline">{label}</p>
      <p className="mt-1 break-words font-label-md font-semibold capitalize text-on-surface">
        {value}
      </p>
    </div>
  );
}