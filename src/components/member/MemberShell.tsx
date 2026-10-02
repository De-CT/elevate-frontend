"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Header } from "./Header";
import { MobileDrawer } from "./MobileDrawer";
import { Sidebar } from "./Sidebar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/wallet": "Elevate Wallet",
  "/savings": "My Savings",
  "/opportunities": "Opportunities",
  "/transactions": "Transactions",
  "/notifications": "Notifications",
  "/support": "Support",
  "/settings": "Settings",
  "/profile": "My Profile",
};

export function MemberShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const firstName = useUserStore((state) => state.user?.firstName || "Member");
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "";
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        memberName={firstName}
      />
      <div className={`min-h-screen transition-[padding] duration-200 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <Header
          member={{ firstName }}
          title={title}
          onMenuClick={() => setDrawerOpen(true)}
        />
        {children}
      </div>
    </div>
  );
}
