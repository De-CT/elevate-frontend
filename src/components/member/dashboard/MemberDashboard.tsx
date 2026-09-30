"use client";

import { useState } from "react";
import Link from "next/link";
import { HandCoins, Plus, Wallet } from "lucide-react";
import { MobileDrawer } from "../MobileDrawer";
import { Header } from "../Header";
import { WalletSummary } from "./WalletSummary";
import { PaymentReminder } from "./PaymentReminder";
import { SavingsSection } from "./SavingsSection";
import { OpportunitiesSection } from "./OpportunitiesSection";
import { SupportBanner } from "./SupportBanner";
import { opportunities } from "./dashboard-data";
import { Sidebar } from "../Sidebar";
import { useUserStore, type UserProfile } from "@/store/useUserStore";

type DashboardSavingsPlan = {
    id: string;
    packageName: string;
    hands: number;
    handsOnTrack: number;
    handsNeedingAttention: number;
    saved: number;
    target: number;
    currentPeriod: number;
    totalPeriods: number;
    periodLabel: string;
    nextPayment: number;
    paymentFrequency: string;
    benefitLabel: string;
    status: "Active" | "Completed" | "Needs Attention";
};

type DashboardUser = UserProfile & {
    wallet?: { balance?: number };
    savingsPlans?: DashboardSavingsPlan[];
    paymentSchedules?: unknown[];
    recentActivity?: unknown[];
};

export function MemberDashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const user = useUserStore((state) => state.user) as DashboardUser | null;
    const savingsPlans = user?.savingsPlans ?? [];
    const paymentSchedules = user?.paymentSchedules ?? [];
    const recentActivity = user?.recentActivity ?? [];
    const firstName = user?.firstName || "Member";
    const wallet = {
        balance: user?.wallet?.balance ?? 0,
        accountNumber: user?.virtualAccount?.accountNumber ?? "",
        bankName: user?.virtualAccount?.bankName ?? "",
    };

    return (
        <div className="min-h-screen bg-[#E5FFF7] text-[#071F1B]">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <MobileDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                memberName={firstName}
            />

            <div className={`min-h-screen ${collapsed ? "pl-20" : "lg:pl-64"}`}>
                <Header
                    member={{ firstName }}
                    onMenuClick={() => setDrawerOpen(true)}
                />

                <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 sm:px-6 lg:px-8">
                    <section className="flex flex-col justify-between gap-3 pt-1 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-2xl font-bold leading-snug text-[#004D3A] sm:text-3xl">
                                Hello, {firstName}
                            </h1>
                            <p className="mt-1 text-sm text-[#3F4944]">
                                Welcome to your Elevate Heart platform
                            </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#006B54]">
                            <span className="h-2 w-2 rounded-full bg-[#006B54]" />
                            Elevate Member Verified
                        </span>
                    </section>

                    <WalletSummary wallet={wallet} />

                    <PaymentReminder hasPayments={paymentSchedules.length > 0} />

                    <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#F2D5E3]/60 bg-gradient-to-r from-[#FFD9E4] via-[#FFF1F6] to-white p-5 sm:flex-row sm:items-center sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#004D3A] text-white">
                                <HandCoins className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase text-[#004D3A]">Getting started · 3 quick steps</p>
                                <h2 className="mt-1 text-lg font-bold text-[#071F1B]">Welcome to Elevate Heart</h2>
                                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#3F4944]">
                                    Add money to your Elevate Wallet, choose a savings program, and grow your savings week by week.
                                </p>
                            </div>
                        </div>
                        <Link href="#" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#004D3A] px-5 text-sm font-semibold text-white hover:bg-[#00674F]">
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Choose a Program
                        </Link>
                    </section>

                    <SavingsSection plans={savingsPlans} />

                    <div className="grid grid-cols-1 gap-8 pt-2 lg:grid-cols-12">
                        <section className="space-y-4 lg:col-span-5">
                            <h2 className="text-xl font-bold text-[#004D3A]">Recent Activity</h2>
                            {recentActivity.length === 0 ? (
                                <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-[#D3EEE6] bg-white p-6 text-center">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E5FFF7] text-[#3F4944]">
                                        <Wallet className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="font-bold text-[#004D3A]">No activity yet</h3>
                                    <p className="mt-1 max-w-xs text-sm leading-relaxed text-[#6F7A74]">
                                        Your payments and savings activity will appear here once you begin.
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-[#D3EEE6] bg-white p-5 text-sm text-[#3F4944]">
                                    {recentActivity.length} recent {recentActivity.length === 1 ? "activity" : "activities"}
                                </div>
                            )}
                        </section>

                        <div className="lg:col-span-7">
                            <OpportunitiesSection opportunities={opportunities} />
                        </div>
                    </div>

                    <SupportBanner />
                </main>

                <footer className="mt-10 border-t border-[#D3EEE6] bg-white/50 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                        <p className="text-xs text-[#3F4944]">
                            © {new Date().getFullYear()} Elevate Heart Foundation. All rights
                            reserved.
                        </p>

                        <div className="flex gap-5 text-xs text-[#3F4944]">
                            <a href="/privacy" className="hover:text-[#004D3A]">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="hover:text-[#004D3A]">
                                Terms of Service
                            </a>
                            <a href="/support" className="hover:text-[#004D3A]">
                                Contact Center
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}