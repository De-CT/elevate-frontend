"use client";

import Link from "next/link";
import { HandCoins, Plus, Wallet } from "lucide-react";
import { WalletSummary } from "./WalletSummary";
import { PaymentReminder } from "./PaymentReminder";
import { SavingsSection } from "./SavingsSection";
import { OpportunitiesSection } from "./OpportunitiesSection";
import { SupportBanner } from "./SupportBanner";
import { opportunities } from "./dashboard-data";
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
        <>
                <main className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-6 sm:px-6 lg:px-8">
                    <section className="flex flex-col justify-between gap-3 pt-1 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="font-headline text-2xl font-bold leading-snug text-primary sm:text-3xl">
                                Hello, {firstName}
                            </h1>
                            <p className="mt-1 font-body text-sm text-on-surface-variant">
                                Welcome to your Elevate Heart platform
                            </p>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-container-lowest px-3 py-1.5 font-label-md text-xs font-semibold text-secondary">
                            <span className="h-2 w-2 rounded-full bg-secondary" />
                            Elevate Member Verified
                        </span>
                    </section>

                    <WalletSummary wallet={wallet} />

                    <PaymentReminder hasPayments={paymentSchedules.length > 0} />

                    <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-tertiary-fixed-dim/40 bg-linear-to-r from-tertiary-fixed/45 via-tertiary-fixed/20 to-surface-container-lowest p-5 sm:flex-row sm:items-center sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary">
                                <HandCoins className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="font-label-xs text-xs font-bold uppercase text-primary">Getting started · 3 quick steps</p>
                                <h2 className="mt-1 font-headline text-lg font-bold text-on-surface">Welcome to Elevate Heart</h2>
                                <p className="mt-1 max-w-3xl font-body text-sm leading-relaxed text-on-surface-variant">
                                    Add money to your Elevate Wallet, choose a savings program, and grow your savings week by week.
                                </p>
                            </div>
                        </div>
                        <Link href="#" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-5 font-label-md text-sm font-semibold text-on-primary hover:bg-primary-container">
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Choose a Program
                        </Link>
                    </section>

                    <SavingsSection plans={savingsPlans} />

                    <div className="grid grid-cols-1 gap-8 pt-2 lg:grid-cols-12">
                        <section className="space-y-4 lg:col-span-5">
                            <h2 className="font-headline text-xl font-bold text-primary">Recent Activity</h2>
                            {recentActivity.length === 0 ? (
                                <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 text-center">
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-on-surface-variant">
                                        <Wallet className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="font-headline font-bold text-primary">No activity yet</h3>
                                    <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-outline">
                                        Your payments and savings activity will appear here once you begin.
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 text-sm text-on-surface-variant">
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

                <footer className="mt-10 border-t border-surface-container-high bg-surface-container-lowest/50 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                        <p className="font-body text-xs text-on-surface-variant">
                            © {new Date().getFullYear()} Elevate Heart Foundation. All rights
                            reserved.
                        </p>

                        <div className="flex gap-5 font-body text-xs text-on-surface-variant">
                            <a href="/privacy" className="hover:text-primary">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="hover:text-primary">
                                Terms of Service
                            </a>
                            <a href="/support" className="hover:text-primary">
                                Contact Center
                            </a>
                        </div>
                    </div>
                </footer>
        </>
    );
}