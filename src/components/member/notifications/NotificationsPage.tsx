"use client";

import NotificationsHeader from "./NotificationsHeader";
import NotificationList from "./NotificationList";
import NotificationPreferences from "./NotificationPreferences";
import { useUserStore } from "@/store/useUserStore";

export default function NotificationsPage() {
  const user = useUserStore((state) => state.user);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <NotificationsHeader />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <NotificationList />
        </div>

        <NotificationPreferences user={user} />
      </div>
    </main>
  );
}