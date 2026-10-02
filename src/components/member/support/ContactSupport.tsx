import { MessageCircle } from "lucide-react";
import ContactCard from "./ContactCard";
import SupportMessageForm from "./SupportMessageForm";
import type { UserProfile } from "@/store/useUserStore";

export default function ContactSupport({ user }: { user: UserProfile | null }) {
  return (
    <section className="space-y-6 pb-8">
      <div>
        <div className="flex items-center gap-2">
          <MessageCircle size={21} className="text-primary" />
          <h2 className="font-headline text-xl font-bold text-on-surface">
            Still need help? Speak with us directly
          </h2>
        </div>
        <p className="mt-1 font-body text-sm text-on-surface-variant">
          Our community support team is here to assist you.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <ContactCard
            label="Call our support team"
            title="+234 800 000 0000"
            description="Speak with someone who can help with your account."
            actionLabel="Call support"
            href="tel:+2348000000000"
            // icon="phone"
          />

          <ContactCard
            label="Email support"
            title="hello@elevateheartfoundation.org"
            description="Send us a message if you prefer email."
            actionLabel="Send email"
            href="mailto:hello@elevateheartfoundation.org"
            icon="mail"
          />
        </div>

        <SupportMessageForm user={user} />
      </div>
    </section>
  );
}