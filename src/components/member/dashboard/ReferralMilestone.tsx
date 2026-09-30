// components/member/dashboard/ReferralMilestone.tsx
import Link from "next/link";
import { Gift, Share2 } from "lucide-react";

type Props = {
  milestone: {
    packageName: string;
    packageNumber: string;
    completedHands: number;
    totalHands: number;
    nextPackageName: string;
    nextPackageNumber: string;
    nextPackageHands: number;
    nextPackageCompletedHands: number;
  };
};

export function ReferralMilestone({ milestone }: Props) {
  const remaining = Math.max(
    milestone.totalHands - milestone.completedHands,
    0,
  );

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#F2D5E3] bg-gradient-to-r from-[#FFD9E4] via-[#FFF1F6] to-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#85004D] text-white shadow-sm">
          <Gift className="h-6 w-6" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#85004D]">
              Your milestone
            </span>
            <span className="text-xs text-[#6F7A74]">•</span>
            <span className="text-xs font-medium text-[#6F7A74]">
              Referral progress
            </span>
          </div>

          <h2 className="mt-1 text-lg font-bold text-[#071F1B]">
            {milestone.packageName} {milestone.packageNumber} —{" "}
            {milestone.completedHands} of {milestone.totalHands} hands completed
          </h2>

          <p className="mt-1 text-sm text-[#3F4944]">
            {remaining > 0
              ? `${remaining} more ${
                  remaining === 1 ? "hand is" : "hands are"
                } needed to reach this package milestone.`
              : "You have completed this milestone."}
          </p>

          <span className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#6F7A74]">
            Next: {milestone.nextPackageName} {milestone.nextPackageNumber} ·{" "}
            {milestone.nextPackageCompletedHands} of{" "}
            {milestone.nextPackageHands} hands
          </span>
        </div>
      </div>

      <Link
        href="/savings/referrals"
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#85004D] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#B00068]"
      >
        <Share2 className="h-4 w-4" />
        View Referral Code
      </Link>
    </section>
  );
}