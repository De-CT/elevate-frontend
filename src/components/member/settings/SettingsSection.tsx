import { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  accent?: boolean;
};

export default function SettingsSection({
  title,
  description,
  icon,
  children,
  accent = false,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm sm:p-8">
      {accent && (
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-secondary" />
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h2 className="font-headline text-xl font-semibold text-on-surface">{title}</h2>
        </div>

        {description && (
          <p className="mt-1 font-body text-sm text-on-surface-variant">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}