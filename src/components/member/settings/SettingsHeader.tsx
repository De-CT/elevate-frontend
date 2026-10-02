import { BadgeCheck } from "lucide-react";
import type { UserProfile } from "@/store/useUserStore";

export default function SettingsHeader({ profile }: { profile: UserProfile | null }) {
  const isVerified = profile?.kycStatus === "VERIFIED";
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>

        <h1 className="font-headline text-2xl font-bold text-primary sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 max-w-2xl font-body text-sm text-on-surface-variant">
          Manage your account security, notification preferences, and session.
        </p>
      </div>

      <div className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 font-label-md text-sm font-semibold ${isVerified ? "bg-secondary-container/50 text-on-secondary-fixed-variant" : "bg-surface-container-high text-on-surface-variant"}`}>
        <BadgeCheck size={17} aria-hidden="true" />
        {isVerified ? "Verified member" : profile?.kycStatus ?? "Verification pending"}
      </div>
    </header>
  );
}