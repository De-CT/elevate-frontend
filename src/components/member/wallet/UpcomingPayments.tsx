import { CalendarDays } from "lucide-react";
import type { UpcomingPayment } from "./wallet-types";
import PaymentCard from "./PaymentCard";

export default function UpcomingPayments({
  payments,
  walletBalance,
}: {
  payments: UpcomingPayment[];
  walletBalance: number;
}) {
  return (
    <section className="rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-3 border-b border-surface-container-low pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-secondary-container p-2 text-on-secondary-fixed-variant">
            <CalendarDays size={20} />
          </span>
          <div>
            <h2 className="font-headline font-bold text-on-surface">
              Upcoming Automatic Payments
            </h2>
            <p className="mt-1 font-body text-xs text-outline">
              Payments are taken from your Elevate Wallet.
            </p>
          </div>
        </div>
        <span className="w-fit rounded-full bg-surface-container-low px-3 py-1.5 font-label-xs text-xs font-bold text-primary-container">
          {payments.length} Scheduled Payments
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              walletBalance={walletBalance}
            />
          ))
        ) : (
          <p className="rounded-xl bg-surface-container-low px-4 py-6 text-center font-body text-sm text-on-surface-variant md:col-span-2">
            No automatic payments are scheduled yet. Active savings payments will appear here.
          </p>
        )}
      </div>
    </section>
  );
}