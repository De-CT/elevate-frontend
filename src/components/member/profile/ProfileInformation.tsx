import { BadgeCheck, CreditCard, LockKeyhole, UserRound } from "lucide-react";
import SettingsSection from "../settings/SettingsSection";
import type { UserProfile } from "@/store/useUserStore";

export function ProfileInformation({ profile }: { profile: UserProfile | null }) {
  const details = [
    { label: "Full name", value: profile ? `${profile.firstName} ${profile.lastName}`.trim() : "Not available", icon: UserRound },
    { label: "Email address", value: profile?.email || "Not provided", icon: null },
    { label: "Phone number", value: profile?.phone || "Not provided", icon: null },
    { label: "Member ID", value: profile?.id || "Not available", icon: null },
    { label: "BVN", value: profile?.bvnLast4 ? `•••••••${profile.bvnLast4}` : "Not linked", icon: LockKeyhole },
    {
      label: "KYC status",
      value: profile?.kycStatus ? profile.kycStatus.replaceAll("_", " ") : "Not available",
      icon: BadgeCheck,
    },
  ];
  const account = profile?.virtualAccount;

  return (
    <SettingsSection
      title="Personal Information"
      description="Account details currently held by Elevate Heart Foundation."
      icon={<UserRound size={22} />}
      accent
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary-container/50 px-3 py-1.5 font-label-xs text-xs font-bold text-on-secondary-fixed-variant">
        <LockKeyhole size={14} aria-hidden="true" />
        Protected account information
      </div>

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {details.map(({ label, value, icon: Icon }) => (
          <div key={label} className="min-w-0 rounded-xl border border-surface-container-high bg-surface-container-lowest p-4">
            <dt className="font-label-xs text-xs font-bold uppercase tracking-wide text-outline">{label}</dt>
            <dd className="mt-2 flex min-w-0 items-center gap-2 font-body text-sm font-medium text-on-surface">
              {Icon && <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
              <span className="wrap-break-word">{value}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 rounded-xl border border-surface-container-high bg-surface-container-low p-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" aria-hidden="true" />
          <h3 className="font-headline text-sm font-semibold text-on-surface">Dedicated account</h3>
        </div>
        {account?.accountNumber ? (
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-label-xs text-xs text-outline">Bank</dt>
              <dd className="mt-1 font-body font-medium text-on-surface">{account.bankName}</dd>
            </div>
            <div>
              <dt className="font-label-xs text-xs text-outline">Account name</dt>
              <dd className="mt-1 font-body font-medium text-on-surface">{account.accountName}</dd>
            </div>
            <div>
              <dt className="font-label-xs text-xs text-outline">Account number</dt>
              <dd className="mt-1 font-mono font-semibold text-primary">{account.accountNumber}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 font-body text-sm text-on-surface-variant">Dedicated account details are not available yet.</p>
        )}
      </div>
    </SettingsSection>
  );
}
