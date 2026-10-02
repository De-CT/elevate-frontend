"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQ } from "./support-types";

type Props = {
  faq: FAQ;
};

export default function FAQItem({ faq }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-surface-container-high last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-surface-container-low"
      >
        <span className="font-headline text-sm font-semibold text-on-surface md:text-base">
          {faq.question}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-primary">
          <ChevronDown
            size={18}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <p className="max-w-4xl font-body text-sm leading-7 text-on-surface-variant">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}