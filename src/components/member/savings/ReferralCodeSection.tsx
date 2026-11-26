"use client";

import { useState } from "react";
import { Check, Copy, Gift } from "lucide-react";
import toast from "react-hot-toast";
import type { SubscriptionReferral } from "@/types/subscription";

export default function ReferralCodeSection({
  referral,
}: {
  referral?: SubscriptionReferral | null;
}) {
  const [copied, setCopied] = useState(false);

  if (referral?.status !== "ACTIVE" || !referral.code) return null;

  const copyInviteLink = async () => {
    const inviteUrl = new URL("/register", window.location.origin);
    inviteUrl.searchParams.set("referralCode", referral.code);

    try {
      await navigator.clipboard.writeText(inviteUrl.toString());
      setCopied(true);
      toast.success("Referral link copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Unable to copy the referral link");
    }
  };

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-secondary/20 bg-secondary-container/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <Gift className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="font-label-md text-sm font-bold text-on-surface">Referral is active</h3>
          <p className="mt-1 font-body text-xs text-on-surface-variant">
            Code <strong className="font-mono text-sm text-primary">{referral.code}</strong>
            {referral.availableSlots > 0 && ` · ${referral.availableSlots} invites available`}
          </p>
          {referral.expiresAt && (
            <p className="mt-1 font-body text-xs text-outline">
              Expires {new Date(referral.expiresAt).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => void copyInviteLink()}
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 font-label-xs text-xs font-bold text-on-primary hover:bg-primary-container"
      >
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {copied ? "Link copied" : "Copy invite link"}
      </button>
    </section>
  );
}