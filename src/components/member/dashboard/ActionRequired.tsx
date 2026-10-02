// components/member/dashboard/ActionRequired.tsx
import Link from "next/link";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";

type Props = {
  payment: {
    packageName: string;
    packageNumber: string;
    handNumber: number;
    contribution: number;
    defaultFee: number;
    walletReady: number;
  };
};

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export function ActionRequired({ payment }: Props) {
  const recoveryAmount = payment.contribution + payment.defaultFee;

  return (
    <section className="relative h-full overflow-hidden rounded-2xl border border-error-container bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-error" />

      <div className="pl-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-error-container px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-on-error-container">
            <AlertTriangle className="h-3.5 w-3.5" />
            Action Required
          </span>
          <span className="text-xs font-semibold text-error">
            Hand #{payment.handNumber} missed
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-primary">
              {payment.packageName} {payment.packageNumber}
            </h2>
            <p className="mt-1 text-sm text-outline">
              Hand #{payment.handNumber} payment recovery
            </p>
          </div>

          <p className="shrink-0 text-lg font-bold text-error">
            {naira(recoveryAmount)}
          </p>
        </div>

        <p className="mt-3 text-xs leading-5 text-outline">
          This includes the missed contribution of {naira(payment.contribution)}
          {" "}and a default fee of {naira(payment.defaultFee)}.
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-surface p-3">
          <div className="flex items-center gap-2 text-xs text-on-surface">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-secondary" />
            <span>
              Wallet available: <strong>{naira(payment.walletReady)}</strong>
            </span>
          </div>
          <span className="text-[10px] font-bold text-secondary">Ready</span>
        </div>

        <Link
          href="/savings/recover-payment"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-error px-4 text-sm font-bold text-on-error shadow-sm transition hover:opacity-90 active:scale-[0.99]"
        >
          <RotateCcw className="h-[18px] w-[18px]" />
          Recover Missed Payment
        </Link>
      </div>
    </section>
  );
}