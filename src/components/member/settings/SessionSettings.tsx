import { LogOut } from "lucide-react";
import SettingsSection from "./SettingsSection";

type Props = {
  onLogout: () => void;
};

export default function SessionSettings({ onLogout }: Props) {
  return (
    <SettingsSection
      title="Session"
      description="End your current session safely on this device."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-sm text-on-surface-variant">
          You will need your phone number and PIN to sign in again.
        </p>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-error px-5 py-3 font-label-md text-sm font-semibold text-on-error transition hover:opacity-90"
        >
          <LogOut size={17} />
          Log out
        </button>
      </div>
    </SettingsSection>
  );
}