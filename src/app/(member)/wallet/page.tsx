"use client";

import { getWallet, getWalletHistory } from "@/backend/user";
import WalletPage from "@/components/member/wallet/WalletPage";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { FullScreenLoader } from "@/components/FullScreenLoader";

type WalletResponse = {
    availableBalance: string | number;
    committedBalance: string | number;
};

export default function Page() {
    const [wallet, setWallet] = useState<WalletResponse | null>(null);
    const [history, setHistory] = useState<Awaited<ReturnType<typeof getWalletHistory>> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        let cancelled = false;

        const loadWallet = async () => {
            try {
                const [walletResponse, historyResponse] = await Promise.all([
                    getWallet(),
                    getWalletHistory(),
                ]);
                if (cancelled) return;
                setWallet(walletResponse as WalletResponse);
                setHistory(historyResponse);
            } catch (loadError) {
                if (cancelled) return;
                setError(loadError instanceof Error ? loadError.message : "Unable to load wallet details.");
            }
        };

        void loadWallet();
        return () => {
            cancelled = true;
        };
    }, []);

    if (error) {
        return (
            <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
                <p role="alert" className="text-sm text-on-surface-variant">{error}</p>
                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary"
                >
                    Try again
                </button>
            </main>
        );
    }

    if (!wallet || !history) return <FullScreenLoader label="Loading your wallet..." />;

    return (
        <WalletPage
            wallet={{
                availableBalance: Number(wallet.availableBalance) || 0,
                committedBalance: Number(wallet.committedBalance) || 0,
            }}
            transactions={history}
            memberId={user?.id ?? ""}
            account={{
                bankName: user?.virtualAccount?.bankName ?? "",
                accountNumber: user?.virtualAccount?.accountNumber ?? "",
                accountName: user?.virtualAccount?.accountName ?? "",
            }}
        />
    );
}