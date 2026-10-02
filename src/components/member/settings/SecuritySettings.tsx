import Link from "next/link";
import { ShieldCheck, LockKeyhole, ArrowUpRight } from "lucide-react";
import SettingsSection from "./SettingsSection";

export default function SecuritySettings() {
  return (
    <SettingsSection
      title="Security"
      description="Keep access to your account protected."
      icon={<ShieldCheck size={22} />}
    >
      <div className="flex flex-col gap-4 rounded-xl border border-surface-container-high bg-surface-container-low p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h3 className="font-headline text-sm font-semibold text-on-surface">Sign-in PIN</h3>
            <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
              PIN changes are handled by account support. Contact the community desk to request a secure change.
            </p>
          </div>
        </div>
        <Link href="/support" className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 font-label-md text-sm font-semibold text-on-primary hover:bg-primary/90">
          Contact support
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </SettingsSection>
  );
}
