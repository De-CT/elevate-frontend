import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
};

export default function SupportCategoryCard({
  title,
  description,
  icon,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex min-h-40 flex-col items-start rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-secondary-accent hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary-accent/30"
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-primary transition group-hover:scale-105">
        {icon}
      </span>

      <span className="flex w-full items-center justify-between gap-3">
        <span className="font-headline text-lg font-bold text-on-surface transition group-hover:text-primary">
          {title}
        </span>
        <ArrowRight
          size={18}
          className="shrink-0 text-on-surface-variant transition group-hover:translate-x-1 group-hover:text-primary"
        />
      </span>

      <span className="mt-1 font-body text-sm leading-5 text-on-surface-variant">
        {description}
      </span>
    </button>
  );
}