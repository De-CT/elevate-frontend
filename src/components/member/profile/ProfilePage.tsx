"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { ProfileInformation } from "./ProfileInformation";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Member";
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || "M";
  const kycVerified = user?.kycStatus === "VERIFIED";

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-5 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-on-primary" aria-hidden="true">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-headline text-2xl font-bold text-on-surface">{fullName}</h1>
          <p className="mt-1 break-all font-body text-sm text-on-surface-variant">{user?.email || "Email not provided"}</p>
        </div>
        <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-label-xs text-xs font-bold ${kycVerified ? "bg-secondary-container/60 text-on-secondary-fixed-variant" : "bg-tertiary-fixed/40 text-tertiary"}`}>
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          {kycVerified ? "Identity verified" : "Verification pending"}
        </span>
      </section>

      <ProfileInformation profile={user} />

      <div className="flex flex-wrap gap-x-5 gap-y-2 font-label-md text-sm">
        <Link href="/settings" className="font-semibold text-primary hover:underline">Account settings</Link>
        <Link href="/support" className="font-semibold text-primary hover:underline">Contact support</Link>
      </div>
    </main>
  );
}
