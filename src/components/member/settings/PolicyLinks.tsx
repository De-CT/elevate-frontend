import { ChevronRight, FileText, LockKeyhole } from "lucide-react";
import SettingsSection from "./SettingsSection";

const policies = [
  {
    title: "Terms and Conditions",
    description: "Read the community agreement and savings rules.",
    href: "/terms",
    icon: FileText,
  },
  {
    title: "Privacy",
    description: "Learn how your personal information is handled.",
    href: "/privacy",
    icon: LockKeyhole,
  },
];

export default function PolicyLinks() {
  return (
    <SettingsSection
      title="Legal and Foundation Policies"
      description="Read the rules and policies that guide your membership."
      icon={<FileText size={22} />}
    >
      <div className="space-y-3">
        {policies.map((policy) => {
          const Icon = policy.icon;

          return (
            <a
              key={policy.title}
              href={policy.href}
              className="group flex items-center justify-between gap-3 rounded-xl bg-surface p-4 transition hover:bg-surface-container-low"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon size={21} className="shrink-0 text-primary" />

                <div>
                  <h3 className="font-headline text-sm font-semibold text-on-surface group-hover:text-primary">
                    {policy.title}
                  </h3>
                  <p className="mt-1 font-body text-xs text-on-surface-variant">
                    {policy.description}
                  </p>
                </div>
              </div>

              <ChevronRight
                size={19}
                className="shrink-0 text-outline transition group-hover:translate-x-1"
              />
            </a>
          );
        })}
      </div>
    </SettingsSection>
  );
}