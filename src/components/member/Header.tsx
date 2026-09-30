// components/member/dashboard/DashboardHeader.tsx
import { Bell, Menu } from "lucide-react";

type Props = {
  member: { firstName: string };
  onMenuClick: () => void;
};

export function Header({ member, onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#D3EEE6] bg-[#E5FFF7]/90 shadow-[0_1px_6px_rgba(0,0,0,0.02)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="rounded-xl bg-white p-2.5 text-[#004D3A] shadow-sm lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <span className="hidden text-xl font-bold text-[#004D3A] lg:block">
            Dashboard
          </span>

          <span className="font-semibold text-[#004D3A] lg:hidden">
            Elevate Heart
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#004D3A] shadow-sm hover:bg-[#D9F4EB]"
          >
            <Bell className="h-[22px] w-[22px]" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#85004D] ring-2 ring-[#E5FFF7]" />
          </button>

          <div className="flex items-center gap-2.5 border-l border-[#D3EEE6] pl-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00674F] text-sm font-bold text-white sm:h-10 sm:w-10">
              {member.firstName.charAt(0)}
            </div>
            <span className="text-sm font-bold text-[#004D3A]">
              {member.firstName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}