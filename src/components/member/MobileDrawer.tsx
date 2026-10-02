// components/member/dashboard/MobileDrawer.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  HandCoins,
  HeartHandshake,
  ReceiptText,
  Bell,
  Headset,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Elevate Wallet", href: "/wallet", icon: Wallet },
  { label: "My Savings", href: "/savings", icon: HandCoins },
  { label: "Opportunities", href: "/opportunities", icon: HeartHandshake },
  { label: "Transactions", href: "/transactions", icon: ReceiptText },
  { label: "Notifications", href: "/notifications", icon: Bell, dot: true },
  { label: "Support", href: "/support", icon: Headset },
  { label: "Settings", href: "/settings", icon: Settings },
];

type Props = {
  open: boolean;
  onClose: () => void;
  memberName?: string;
};

export function MobileDrawer({ open, onClose, memberName = "Member" }: Props) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute bottom-0 left-0 top-0 flex w-72 max-w-[85vw] flex-col justify-between bg-surface-container-lowest shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex h-16 items-center justify-between border-b border-surface-container-high px-5">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="font-semibold text-primary"
            >
          <Image
            src={logo}
            alt="Elevate Heart Foundation logo"
            width={140}
            height={48}
            className="h-11 md:h-12 w-auto object-contain"
            preload
          />
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="rounded-full bg-surface p-2 text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-1.5 overflow-y-auto p-4">
            {links.map(({ label, href, icon: Icon, dot }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3.5 rounded-xl px-3.5 py-3 font-label-md text-sm ${
                    active
                      ? "bg-primary-container font-bold text-on-primary shadow-sm"
                      : "font-medium text-on-surface-variant hover:bg-surface"
                  }`}
                >
                  <Icon className="h-[22px] w-[22px]" />
                  <span className="flex-1">{label}</span>
                  {dot && <span className="h-2.5 w-2.5 rounded-full bg-tertiary" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-surface-container-high bg-surface/60 p-4">
          <span className="font-label-md text-sm font-bold text-primary">{memberName}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-label-xs text-xs font-bold text-error"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </div>
  );
}