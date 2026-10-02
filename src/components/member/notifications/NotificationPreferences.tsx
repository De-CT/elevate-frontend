import Link from "next/link";
import { Mail, Phone, Settings2 } from "lucide-react";
import type { UserProfile } from "@/store/useUserStore";

export default function NotificationPreferences({
  user,
}: {
  user: UserProfile | null;
}) {
  return (
    <aside className="flex flex-col gap-5 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-primary">
          <Settings2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-headline text-lg font-bold text-on-surface">
            Contact details
          </h2>
          <p className="font-body text-xs text-on-surface-variant">
            Used for important account updates
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-label-xs text-xs font-semibold uppercase text-outline">
              Registered phone
            </p>
            <p className="mt-1 truncate font-body text-sm font-medium text-on-surface">
              {user?.phone || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-label-xs text-xs font-semibold uppercase text-outline">
              Email address
            </p>
            <p className="mt-1 truncate font-body text-sm font-medium text-on-surface">
              {user?.email || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-primary-container/15 bg-surface-container-low/70 p-4">
        <p className="font-headline text-sm font-bold text-primary">
          Need to update these details?
        </p>
        <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
          Contact support to request a change to your registered contact information or notification delivery.
        </p>
        <Link
          href="/support"
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-4 font-label-md text-sm font-semibold text-on-primary transition hover:bg-primary-container"
        >
          Contact support
        </Link>
      </div>
    </aside>
  );
}
