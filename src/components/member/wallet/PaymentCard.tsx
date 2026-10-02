import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { UpcomingPayment } from "./wallet-types";

const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function PaymentCard({
  payment,
  walletBalance,
}: {
  payment: UpcomingPayment;
  walletBalance: number;
}) {
  const total = payment.hands * payment.amountPerHand;
  const hasEnoughMoney = walletBalance >= total;

  return (
    <article className="flex flex-col justify-between rounded-xl border border-secondary-accent/30 bg-surface-container-low p-4 sm:p-5">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-headline font-bold text-on-surface">
            {payment.packageName} — {payment.hands} Hands
          </h3>
          <span className="rounded-md border border-primary-container/20 bg-surface-container-lowest px-2.5 py-1 font-label-xs text-xs font-semibold text-primary-container">
            {payment.frequency}
          </span>
        </div>

        <p className="mt-1 font-body text-xs text-on-surface-variant">
          {payment.hands} hands × {money(payment.amountPerHand)}
        </p>
        <p className="mt-3 font-body text-xs leading-relaxed text-on-surface-variant">
          Scheduled for <strong>{payment.nextPayment}</strong>. The money will
          be taken automatically from your wallet.
        </p>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 border-t border-surface-container-low pt-3">
        <div>
          <p className="font-label-xs text-[11px] text-outline">Upcoming Deduction</p>
          <p className="mt-1 font-currency-card text-xl font-bold text-on-surface">{money(total)}</p>
        </div>

        <p
          className={`flex items-center gap-1 text-right font-label-xs text-[11px] font-semibold ${
            hasEnoughMoney ? "text-secondary" : "text-tertiary"
          }`}
        >
          {hasEnoughMoney ? (
            <CheckCircle2 size={14} />
          ) : (
            <AlertTriangle size={14} />
          )}
          {hasEnoughMoney ? "Balance is enough" : "Add money before payment"}
        </p>
      </div>
    </article>
  );
}