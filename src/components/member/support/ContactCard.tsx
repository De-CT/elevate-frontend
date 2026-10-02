import { ArrowUpRight, Mail, Phone } from "lucide-react";

type Props = {
  label: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  icon?: "phone" | "mail";
};

export default function ContactCard({
  label,
  title,
  description,
  actionLabel,
  href,
  icon,
}: Props) {
  const Icon = icon === "phone" ? Phone : Mail
const showIcon = icon === "phone" || icon === "mail";
  return (
    <div className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <div className="space-y-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full ${showIcon ? 'bg-surface-container-low' : ''} px-3 py-1 font-label-xs text-sm font-medium text-primary`}>
{  showIcon &&        <Icon size={14} />}
          {label}
        </span>

        <h3 className="break-words font-headline text-lg font-bold text-on-surface">
          {title}
        </h3>

        <p className="font-body text-sm leading-6 text-on-surface-variant">{description}</p>
      </div>

      <a
        href={href}
        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 font-label-md text-sm font-semibold text-on-primary transition hover:bg-primary/90"
      >
        {actionLabel}
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
}