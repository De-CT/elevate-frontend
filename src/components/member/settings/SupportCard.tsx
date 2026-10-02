import Link from "next/link";
import { Headset, Mail, Phone } from "lucide-react";
import SettingsSection from "./SettingsSection";

export default function SupportCard() {
  return (
    <SettingsSection
      title="Need help?"
      description="Contact the foundation support team for account assistance."
      icon={<Headset size={22} />}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="tel:+2348000000000" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 font-label-md text-sm font-semibold text-on-primary hover:bg-primary/90">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call support
        </a>
        <a href="mailto:hello@elevateheartfoundation.org" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-primary-container px-5 font-label-md text-sm font-semibold text-primary hover:bg-surface-container-low">
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email support
        </a>
        <Link href="/support" className="inline-flex min-h-11 items-center justify-center rounded-full px-4 font-label-md text-sm font-semibold text-primary hover:bg-surface-container-low">
          Support center
        </Link>
      </div>
    </SettingsSection>
  );
}
