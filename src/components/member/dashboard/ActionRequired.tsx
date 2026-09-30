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
    <section className="relative h-full overflow-hidden rounded-2xl border border-[#F2D5E3] bg-white p-5 shadow-sm sm:p-6">
      <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#B00068]" />

      <div className="pl-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD9E4] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#85004D]">
            <AlertTriangle className="h-3.5 w-3.5" />
            Action Required
          </span>
          <span className="text-xs font-semibold text-red-600">
            Hand #{payment.handNumber} missed
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#004D3A]">
              {payment.packageName} {payment.packageNumber}
            </h2>
            <p className="mt-1 text-sm text-[#6F7A74]">
              Hand #{payment.handNumber} payment recovery
            </p>
          </div>

          <p className="shrink-0 text-lg font-bold text-[#85004D]">
            {naira(recoveryAmount)}
          </p>
        </div>

        <p className="mt-3 text-xs leading-5 text-[#6F7A74]">
          This includes the missed contribution of {naira(payment.contribution)}
          {" "}and a default fee of {naira(payment.defaultFee)}.
        </p>

        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-[#E5FFF7] p-3">
          <div className="flex items-center gap-2 text-xs text-[#071F1B]">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#006B54]" />
            <span>
              Wallet available: <strong>{naira(payment.walletReady)}</strong>
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#006B54]">Ready</span>
        </div>

        <Link
          href="/savings/recover-payment"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#85004D] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#B00068] active:scale-[0.99]"
        >
          <RotateCcw className="h-[18px] w-[18px]" />
          Recover Missed Payment
        </Link>
      </div>
    </section>
  );
}