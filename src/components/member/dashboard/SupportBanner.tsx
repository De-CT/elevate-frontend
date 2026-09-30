// components/member/dashboard/SupportBanner.tsx
import Link from "next/link";
import { Headset, Phone } from "lucide-react";

export function SupportBanner() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#CEE8E0] bg-[#CEE8E0]/70 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004D3A] text-white shadow-sm">
          <Headset className="h-6 w-6" />
        </div>

        <div>
          <h2 className="font-bold text-[#004D3A]">
            Need help with savings?
          </h2>
          <p className="mt-1 text-sm text-[#3F4944]">
            We are here to assist you.
          </p>
        </div>
      </div>

      <Link
        href="/support"
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#004D3A] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#00674F]"
      >
        <Phone className="h-[18px] w-[18px]" />
        Contact Support
      </Link>
    </section>
  );
}