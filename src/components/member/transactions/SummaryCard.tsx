import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  amount: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "secondary" | "tertiary";
}

const accentStyles = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
};

const iconStyles = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
};

export default function SummaryCard({
  label,
  amount,
  description,
  icon: Icon,
  accent,
}: Props) {
  return (
    <article className="relative flex items-center justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-sm">
      <span
        className={`absolute bottom-0 left-0 top-0 w-1.5 ${accentStyles[accent]}`}
      />

      <div className="min-w-0 pl-2">
        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
          {label}
        </p>
        <p className="mt-2 font-display text-2xl font-bold tabular-nums text-primary">
          {amount}
        </p>
        <p className="mt-1 text-xs text-on-surface-variant">{description}</p>
      </div>

      <div
        className={`ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconStyles[accent]}`}
      >
        <Icon size={23} />
      </div>
    </article>
  );
}