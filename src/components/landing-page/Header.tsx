"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import footerLogoImage from "../../assets/images/logo.png";

const NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community Impact", href: "#empowerment" },
  { label: "FAQs", href: "#faq" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={footerLogoImage}
            alt="Elevate Heart Foundation logo"
            width={140}
            height={48}
            className="h-11 md:h-12 w-auto object-contain"
            preload
          />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-semibold text-on-surface hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-primary bg-surface-container hover:bg-surface-container-high transition-all">
            Sign In
          </button>
          <a
            href="/register"
            className="px-6 py-2.5 rounded-full font-sans text-sm font-bold text-on-primary bg-primary hover:bg-primary-container shadow-md hover:shadow-lg transition-all"
          >
            Join Elevate Heart
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden absolute left-4 right-4 top-full mt-2 z-50 rounded-2xl border border-surface-container bg-surface-container-lowest shadow-lg p-4 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm font-semibold text-on-surface hover:text-primary hover:bg-surface-container-low rounded-xl px-3 py-2.5 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-surface-container">
            <button
              onClick={() => setOpen(false)}
              className="w-full px-5 py-2.5 rounded-full font-sans text-sm font-semibold text-primary bg-surface-container hover:bg-surface-container-high transition-all"
            >
              Sign In
            </button>
            <a
              href="/register"
              onClick={() => setOpen(false)}
              className="w-full text-center px-6 py-2.5 rounded-full font-sans text-sm font-bold text-on-primary bg-primary hover:bg-primary-container shadow-md transition-all"
            >
              Join Elevate Heart
            </a>
          </div>
        </div>
      )}
    </header>
  );
}