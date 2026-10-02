"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { WalletTransaction } from "./wallet-types";

const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function TransactionDetailsModal({
  transaction,
  onClose,
}: {
  transaction: WalletTransaction | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!transaction) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [transaction, onClose]);

  if (!transaction) return null;

  const isIncoming = transaction.type === "in";

  const rows = [
    ["Payment Description", transaction.title],
    ["For / From", transaction.details],
    ["Date & Time", transaction.date],
    ["Status", transaction.status],
    ["Reference Code", transaction.reference],
    ["Payment Method", transaction.method],
  ];

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-title"
        className="w-full max-w-md rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <h2
            id="transaction-title"
            className="font-headline font-bold text-on-surface"
          >
            Payment Details
          </h2>
          <button
            onClick={onClose}
            aria-label="Close payment details"
            className="rounded-lg p-2 text-outline hover:bg-surface-container-low hover:text-on-surface"
          >
            <X size={20} />
          </button>
        </div>

        <div className="my-4 rounded-xl bg-surface-container-low/60 py-4 text-center">
          <p className="font-label-xs text-xs text-outline">Amount</p>
          <p
            className={`mt-1 font-currency-card text-2xl font-bold ${
              isIncoming ? "text-secondary" : "text-primary-container"
            }`}
          >
            {isIncoming ? "+" : "-"}
            {money(transaction.amount)}
          </p>
        </div>

        <div className="space-y-3">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 border-b border-outline-variant/20 pb-2 last:border-0"
            >
              <span className="text-xs text-outline">{label}</span>
              <span className="max-w-[60%] break-words text-right text-xs font-semibold text-on-surface">
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 min-h-11 w-full rounded-xl bg-primary-container px-4 py-3 text-sm font-bold text-on-primary hover:bg-primary"
        >
          Done
        </button>
      </section>
    </div>
  );
}