// components/member/dashboard/PaymentReminder.tsx
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export function PaymentReminder({ hasPayments = false }: { hasPayments?: boolean }) {
  if (!hasPayments) {
    return (
      <section className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-secondary-accent" />
        <div className="flex items-start gap-3 pl-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container text-secondary">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-label-xs text-xs font-bold uppercase tracking-wide text-secondary">All caught up</p>
            <h2 className="mt-1 font-headline text-base font-bold text-on-surface">No payments due</h2>
            <p className="mt-1 font-body text-sm text-on-surface-variant">
              You do not have any active payment schedules. Start a savings program to begin.
            </p>
          </div>
        </div>
        <Link
          href="/packages"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 font-label-md text-sm font-semibold text-on-primary hover:bg-primary-container"
        >
          View Programs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tertiary text-on-tertiary">
          <AlertCircle className="h-5 w-5" />
        </div>

        <div>
          <p className="font-label-xs text-xs font-bold uppercase tracking-wide text-tertiary">
            Payment reminder
          </p>
          <h2 className="mt-1 font-headline text-base font-bold text-on-surface">
            Your next savings payment is coming up
          </h2>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Keep money in your Elevate Wallet so your scheduled payment can go
            through.
          </p>
        </div>
      </div>

      <Link
        href="/savings"
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-tertiary px-5 font-label-md text-sm font-semibold text-on-tertiary hover:bg-deep-magenta-brand"
      >
        View Savings
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}