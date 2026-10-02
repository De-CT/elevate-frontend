// components/member/dashboard/SavingsSection.tsx
import Link from "next/link";
import { Plus, ChevronRight, HandCoins } from "lucide-react";
import { SavingsCard } from "./SavingsCard";

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

export function SavingsSection({ plans }: { plans: SavingsPlan[] }) {
  const activeCount = plans.filter((plan) => plan.status === "Active").length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h2 className="font-headline text-xl font-bold text-primary sm:text-2xl">
            My Savings
          </h2>
          <span className="rounded-full bg-secondary-container px-2.5 py-1 font-label-xs text-xs font-bold text-on-secondary-fixed-variant">
            {activeCount} active
          </span>
        </div>

        <Link
          href="/savings"
          className="inline-flex items-center gap-1 font-label-md text-sm font-semibold text-secondary hover:underline"
        >
          Details
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-surface-container-high bg-surface-container-lowest px-6 py-10 text-center sm:py-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface text-primary">
            <HandCoins className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="font-headline text-lg font-bold text-primary">You have no savings yet</h3>
          <p className="mt-1 max-w-md font-body text-sm leading-relaxed text-outline">
            Choose a program to start saving towards your goals.
          </p>
          <Link
            href="#"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-label-md text-sm font-semibold text-on-primary hover:bg-primary-container"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            Choose a Program
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <SavingsCard key={plan.id} plan={plan} />
            ))}
          </div>
          <Link
            href="/packages"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-primary-fixed bg-surface-container-low px-4 py-3 font-label-md text-sm font-bold text-primary transition hover:bg-surface-container-highest"
          >
            <Plus className="h-5 w-5" />
            Start Another Savings
          </Link>
        </>
      )}
    </section>
  );
}