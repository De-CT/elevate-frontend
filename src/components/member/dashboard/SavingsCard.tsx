// components/member/dashboard/SavingsCard.tsx
import Link from "next/link";
import { ArrowRight, CalendarClock, Store, ShoppingBasket } from "lucide-react";

type SavingsPlan = {
  id: string;
  packageName: string;
  hands: number;
  handsOnTrack: number;
  handsNeedingAttention: number;
  saved: number;
  target: number;
  currentPeriod: number;
  totalPeriods: number;
  periodLabel: string;
  nextPayment: number;
  paymentFrequency: string;
  benefitLabel: string;
  status: "Active" | "Completed" | "Needs Attention";
};

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export function SavingsCard({ plan }: { plan: SavingsPlan }) {
  const progress =
    plan.target > 0
      ? Math.min((plan.saved / plan.target) * 100, 100)
      : 0;

  const isChopBeta = plan.packageName === "Chop Beta";
  const Icon = isChopBeta ? ShoppingBasket : Store;

  return (
    <article className="flex flex-col justify-between gap-4 rounded-2xl border border-[#D3EEE6]/70 bg-white p-5 shadow-[0_4px_16px_-2px_rgba(0,77,58,0.06)]">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                isChopBeta
                  ? "bg-[#D9F4EB] text-[#00674F]"
                  : "bg-[#A0F3D4] text-[#004D3A]"
              }`}
            >
              <Icon className="h-[22px] w-[22px]" />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-[#071F1B]">
                {plan.packageName} — {plan.hands}{" "}
                {plan.hands === 1 ? "Hand" : "Hands"}
              </h3>
              <p className="mt-0.5 text-xs text-[#6F7A74]">
                {plan.handsOnTrack} on track
                {plan.handsNeedingAttention > 0 &&
                  `, ${plan.handsNeedingAttention} need attention`}
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-[#D9F4EB] px-2.5 py-1 text-[11px] font-bold text-[#00513F]">
            {plan.status}
          </span>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="mb-1 text-xs font-medium text-[#6F7A74]">
                Money Saved
              </p>
              <p className="text-xl font-bold text-[#004D3A]">
                {naira(plan.saved)}
                <span className="ml-1 text-sm font-normal text-[#6F7A74]">
                  / {naira(plan.target)}
                </span>
              </p>
            </div>

            <span className="text-xs font-bold text-[#006B54]">
              {plan.currentPeriod} of {plan.totalPeriods} {plan.periodLabel}
            </span>
          </div>

          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-[#CEE8E0]"
            role="progressbar"
            aria-label={`${plan.packageName} savings progress`}
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#16BE97] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#D3EEE6] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 text-xs text-[#3F4944]">
          {isChopBeta ? (
            <ShoppingBasket className="mt-0.5 h-4 w-4 shrink-0 text-[#006B54]" />
          ) : (
            <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-[#006B54]" />
          )}
          <span>
            Next auto-pay:{" "}
            <strong className="text-[#071F1B]">
              {naira(plan.nextPayment)}/{plan.paymentFrequency}
            </strong>
            <span className="block text-[#6F7A74]">{plan.benefitLabel}</span>
          </span>
        </div>

        <Link
          href={`/savings/${plan.id}`}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-full bg-[#E5FFF7] px-4 text-xs font-bold text-[#004D3A] hover:bg-[#D9F4EB]"
        >
          View Savings
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}