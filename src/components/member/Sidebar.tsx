// components/member/dashboard/MemberSidebar.tsx
"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    HandCoins,
    HeartHandshake,
    ReceiptText,
    Bell,
    Headset,
    Settings,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import icon from "@/app/icon.png"
import Image from "next/image";

const links = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Elevate Wallet", href: "/wallet", icon: Wallet },
    { label: "My Savings", href: "/savings", icon: HandCoins },
    { label: "Opportunities", href: "/opportunities", icon: HeartHandshake },
    { label: "Transactions", href: "/transactions", icon: ReceiptText },
    { label: "Notifications", href: "/notifications", icon: Bell, dot: true },
    { label: "Support", href: "/support", icon: Headset },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean;  setCollapsed: Dispatch<SetStateAction<boolean>> }) {
    const pathname = usePathname();

    return (
        <aside
            className={`fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-surface-container-high bg-surface-container-lowest shadow-[2px_0_12px_rgba(0,77,58,0.04)] transition-all duration-200 lg:flex ${collapsed ? "w-20" : "w-64"
                }`}
        >
            <div className="flex h-20 shrink-0 items-center border-b border-surface-container-high px-5">
                {collapsed ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white">
                        <Image
                            src={icon}
                            alt="Elevate Heart Foundation logo"
                            width={40}
                            height={40}
                            className="h-11 md:h-12 w-auto object-contain"
                            preload
                        />
                    </div>
                ) : (
                    <Link href="/dashboard" className="font-semibold text-primary">
                        <Image
                            src={logo}
                            alt="Elevate Heart Foundation logo"
                            width={140}
                            height={48}
                            className="h-11 md:h-12 w-auto object-contain"
                            preload
                        />
                    </Link>
                )}
            </div>

            <nav className="flex-1 space-y-1.5 overflow-y-auto p-3">
                {links.map(({ label, href, icon: Icon, dot }) => {
                    const active = pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={label}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            title={collapsed ? label : undefined}
                            className={`flex items-center gap-3 rounded-xl px-3.5 py-3 font-label-md text-sm transition-colors ${active
                                ? "bg-primary-container font-bold text-on-primary shadow-sm"
                                : "font-medium text-on-surface-variant hover:bg-surface hover:text-primary"
                                } ${collapsed ? "justify-center" : ""}`}
                        >
                            <Icon className="h-[22px] w-[22px] shrink-0" />
                            {!collapsed && <span className="flex-1">{label}</span>}
                            {!collapsed && dot && (
                                <span className="h-2 w-2 rounded-full bg-tertiary" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-surface-container-high p-3">
                <button
                    type="button"
                    onClick={() => setCollapsed((value) => !value)}
                    className="flex w-full items-center justify-center gap-3 rounded-xl px-3 py-2.5 font-label-xs text-xs font-semibold text-on-surface-variant hover:bg-surface hover:text-primary"
                >
                    {collapsed ? (
                        <ChevronsRight className="h-5 w-5" />
                    ) : (
                        <>
                            <ChevronsLeft className="h-5 w-5" />
                            <span>Collapse Menu</span>
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
}