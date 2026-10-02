"use client";

import { useMemo, useState } from "react";
import type { WalletTransaction } from "./wallet-types";

import WalletOverview from "./WalletOverview";
import DedicatedAccountCard from "./DedicatedAccountCard";
import AddMoneyGuide from "./AddMoneyGuide";
import UpcomingPayments from "./UpcomingPayments";
import WalletHistory from "./WalletHistory";
import TransactionDetailsModal from "./TransactionDetailsModal";
import toast from "react-hot-toast";

type WalletPageProps = {
    wallet: {
        availableBalance: number;
        committedBalance: number;
    };
    transactions: WalletTransaction[];
    memberId: string;
    account: {
        bankName: string;
        accountNumber: string;
        accountName: string;
    };
};

export default function WalletPage({ wallet, transactions: allTransactions, memberId, account }: WalletPageProps) {
    const [selectedTransaction, setSelectedTransaction] =
        useState<WalletTransaction | null>(null);

    const [filter, setFilter] = useState<"all" | "in" | "out">("all");

    const transactions = useMemo(
        () =>
            allTransactions.filter(
                (transaction) => filter === "all" || transaction.type === filter
            ),
        [allTransactions, filter]
    );

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const copyText = async (value: string, label: string) => {
        try {
            await navigator.clipboard.writeText(value);
            //   window.dispatchEvent(
            //     new CustomEvent("wallet-toast", {
            //       detail: `${label} copied`,
            //     })
            //   );
            toast.success(`${label} copied`)

        } catch {
            // window.dispatchEvent(
            //     new CustomEvent("wallet-toast", {
            //         detail: "Could not copy. Please try again.",
            //     })
            // );
            toast.error(`${label} copied`)
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            {/* Reuse your existing member layout/sidebar/header here if your
          dashboard already provides them. Keep this page content inside
          that shared layout rather than duplicating the navigation. */}

            <main className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
                <div className="lg:hidden">
                    <h1 className="font-headline text-xl font-bold text-on-surface">Elevate Wallet</h1>
                    <p className="mt-1 font-body text-sm text-outline">
                        Add money by bank transfer and view your wallet activity.
                    </p>
                </div>

                <section className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <WalletOverview
                            availableBalance={wallet.availableBalance}
                            committedBalance={wallet.committedBalance}
                            onAddMoney={() => scrollTo("add-money")}
                            onHistory={() => scrollTo("wallet-history")}
                        />
                    </div>

                    <div className="lg:col-span-5">
                        <DedicatedAccountCard
                            account={account}
                            onCopy={copyText}
                        />
                    </div>
                </section>

                {/* <AddMoneyGuide account={account} onCopy={copyText} /> */}

                <UpcomingPayments
                    payments={[]}
                    walletBalance={wallet.availableBalance}
                />

                <WalletHistory
                    transactions={transactions}
                    filter={filter}
                    onFilterChange={setFilter}
                    onSelectTransaction={setSelectedTransaction}
                />
            </main>

            <TransactionDetailsModal
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
            />
        </div>
    );
}