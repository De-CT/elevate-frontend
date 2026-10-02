// components/member/dashboard/DashboardHeader.tsx
import { Bell, Menu } from "lucide-react";
import Link from "next/link";

type Props = {
  member: { firstName: string };
  title?: string;
  onMenuClick: () => void;
};

export function Header({ member, title = "Dashboard", onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-white bg-white shadow-[0_1px_6px_rgba(0,0,0,0.02)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="rounded-xl bg-surface-container-lowest p-2.5 text-primary shadow-sm lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <span className=" font-headline text-xl font-bold text-primary lg:block">
            {title}
          </span>

        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-sm hover:bg-surface-container"
          >
            <Bell className="h-[22px] w-[22px]" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-tertiary ring-2 ring-surface" />
          </Link>

          <Link
            href="/profile"
            aria-label={`View ${member.firstName}'s profile`}
            className="flex items-center gap-2.5 border-l border-surface-container-high pl-3 hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary sm:h-10 sm:w-10">
              {member.firstName.charAt(0)}
            </div>
            <span className="font-label-md text-sm font-bold text-primary">
              {member.firstName}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}