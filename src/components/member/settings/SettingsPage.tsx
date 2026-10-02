"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SettingsHeader from "./SettingsHeader";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import PolicyLinks from "./PolicyLinks";
import SessionSettings from "./SessionSettings";
import SupportCard from "./SupportCard";
import LogoutDialog from "./LogoutDialog";
import { useAuthStore } from "@/store/useAuthStore";
import { useAppStore } from "@/store/useAppStore";
import { useUserStore } from "@/store/useUserStore";

export default function SettingsPage() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const profile = useUserStore((state) => state.user);
  const clearAuthToken = useAuthStore((state) => state.clearAuthToken);
  const clearUser = useUserStore((state) => state.clearUser);
  const setRegistrationDraft = useAppStore((state) => state.setRegistrationDraft);

  const handleLogout = () => {
    clearAuthToken();
    clearUser();
    setRegistrationDraft(null);
    setShowLogout(false);
    router.replace("/login");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <SettingsHeader profile={profile} />

      <SecuritySettings />

      <NotificationSettings />

      <PolicyLinks />

      <SessionSettings onLogout={() => setShowLogout(true)} />

      <SupportCard />

      <LogoutDialog
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}