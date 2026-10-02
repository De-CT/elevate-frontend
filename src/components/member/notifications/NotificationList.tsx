import { BellOff } from "lucide-react";
import NotificationItem, { type Notification } from "./NotificationItem";

export default function NotificationList({ notifications = [] }: { notifications?: Notification[] }) {
  if (notifications.length > 0) {
    return (
      <section className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
        <h2 className="border-b border-surface-container px-5 py-4 font-headline text-lg font-bold text-on-surface">
          Recent notifications
        </h2>
        <ul aria-label="Notifications">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-surface-container-high bg-surface-container-lowest px-6 py-12 text-center shadow-sm">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary">
        <BellOff className="h-8 w-8" aria-hidden="true" />
      </div>
      <h2 className="font-headline text-xl font-bold text-on-surface">
        You’re all caught up
      </h2>
      <p className="mt-2 max-w-md font-body text-sm leading-6 text-on-surface-variant">
        There are no notifications yet. New payment, wallet, and savings updates will appear here.
      </p>
    </section>
  );
}