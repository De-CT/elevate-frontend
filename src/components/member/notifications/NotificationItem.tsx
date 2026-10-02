import { Bell, HandCoins, Wallet } from "lucide-react";

export type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  category?: "wallet" | "savings" | "general";
  isRead?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function NotificationItem({ notification }: { notification: Notification }) {
  const Icon = notification.category === "wallet"
    ? Wallet
    : notification.category === "savings"
      ? HandCoins
      : Bell;
  const timestamp = new Date(notification.createdAt);
  const formattedDate = Number.isNaN(timestamp.getTime())
    ? notification.createdAt
    : dateFormatter.format(timestamp);

  return (
    <li className={`relative flex gap-4 border-b border-surface-container px-5 py-5 last:border-b-0 ${notification.isRead === false ? "bg-surface-container-low/60" : "bg-surface-container-lowest"}`}>
      {notification.isRead === false && (
        <span className="absolute left-0 top-0 h-full w-1 bg-primary" aria-label="Unread" />
      )}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <h3 className="font-headline text-base font-bold text-on-surface">{notification.title}</h3>
          <time className="font-body text-xs text-outline" dateTime={notification.createdAt}>
            {formattedDate}
          </time>
        </div>
        <p className="mt-1 font-body text-sm leading-relaxed text-on-surface-variant">
          {notification.message}
        </p>
      </div>
    </li>
  );
}