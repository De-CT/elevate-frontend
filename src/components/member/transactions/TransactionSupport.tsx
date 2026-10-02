import { MessageCircle, Phone, MapPin, Headset } from "lucide-react";
import Link from "next/link";

export default function TransactionSupport() {
  return (
    <section className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <Headset size={28} />
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-primary">
              Need help with a transaction?
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-on-surface-variant">
              If a payment is missing or you have a question about a deduction,
              contact our support team. Keep your transaction reference handy.
            </p>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-primary">
              <span className="flex items-center gap-1.5">
                <Phone size={15} className="text-secondary" />
                +234 800 000 0000
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-secondary" />
                Contact support for help
              </span>
            </div>
          </div>
        </div>

        <Link
          href="/support"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-container"
        >
          <MessageCircle size={17} />
          Contact Support
        </Link>
      </div>
    </section>
  );
}