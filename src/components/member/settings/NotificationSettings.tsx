import { BellRing, Info } from "lucide-react";
import SettingsSection from "./SettingsSection";

export default function NotificationSettings() {
  return (
    <SettingsSection
      title="Notifications"
      description="Information about account and savings updates."
      icon={<BellRing size={22} />}
    >
      <div className="flex items-start gap-3 rounded-xl border border-surface-container-high bg-surface-container-low p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="font-body text-sm leading-relaxed text-on-surface-variant">
          Notification preferences are managed by the foundation and cannot be changed here yet. Account and payment updates will be sent to the contact details shown above.
        </p>
      </div>
    </SettingsSection>
  );
}
