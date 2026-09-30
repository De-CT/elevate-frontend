// components/member/dashboard/PaymentReminder.tsx
import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export function PaymentReminder({ hasPayments = false }: { hasPayments?: boolean }) {
  if (!hasPayments) {
    return (
      <section className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#D3EEE6] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#16BE97]" />
        <div className="flex items-start gap-3 pl-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9F4EB] text-[#006B54]">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#006B54]">All caught up</p>
            <h2 className="mt-1 text-base font-bold text-[#071F1B]">No payments due</h2>
            <p className="mt-1 text-sm text-[#3F4944]">
              You do not have any active payment schedules. Start a savings program to begin.
            </p>
          </div>
        </div>
        <Link
          href="/packages"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#004D3A] px-5 text-sm font-semibold text-white hover:bg-[#00674F]"
        >
          View Programs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#F2D5E3] bg-[#FFF5FA] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#85004D] text-white">
          <AlertCircle className="h-5 w-5" />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#85004D]">
            Payment reminder
          </p>
          <h2 className="mt-1 text-base font-bold text-[#071F1B]">
            Your next savings payment is coming up
          </h2>
          <p className="mt-1 text-sm text-[#3F4944]">
            Keep money in your Elevate Wallet so your scheduled payment can go
            through.
          </p>
        </div>
      </div>

      <Link
        href="/savings"
        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#85004D] px-5 text-sm font-semibold text-white hover:bg-[#B00068]"
      >
        View Savings
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}