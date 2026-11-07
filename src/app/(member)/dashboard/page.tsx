"use client"
import {
    claimSubscription,
    getWallet,
    listSubscriptions,
    retryOverDuePayment,
} from "@/backend/user";
import { MemberDashboard } from "@/components/member/dashboard/MemberDashboard";
import type { Subscription } from "@/types/subscription";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function DashboardPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [subscriptionsLoading, setSubscriptionsLoading] = useState(true);
    const [walletBalance, setWalletBalance] = useState<number | null>(null);
    const [walletLoading, setWalletLoading] = useState(true);
    const [walletError, setWalletError] = useState<string | null>(null);
    const [activatingSubscriptionId, setActivatingSubscriptionId] = useState<string | null>(null);
    const [retryingSubscriptionId, setRetryingSubscriptionId] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const fetchSubscriptions = async () => {
            try {
                const result = await listSubscriptions();
                if (!cancelled) setSubscriptions(result);
            } catch (error) {
                if (!cancelled) {
                    toast.error(error instanceof Error ? error.message : "Unable to load subscriptions.");
                }
            } finally {
                if (!cancelled) setSubscriptionsLoading(false);
            }
        };

        void fetchSubscriptions();
        return () => {
            cancelled = true;
        };
    }, [])

    useEffect(() => {
        let cancelled = false;

        const fetchWallet = async () => {
            try {
                const wallet = await getWallet();
                const balance = Number(wallet.availableBalance);
                if (!Number.isFinite(balance)) {
                    throw new Error("The wallet response did not include a valid available balance.");
                }
                if (!cancelled) {
                    setWalletBalance(balance);
                    setWalletError(null);
                }
            } catch (error) {
                if (!cancelled) {
                    setWalletError(error instanceof Error ? error.message : "Unable to load wallet balance.");
                }
            } finally {
                if (!cancelled) setWalletLoading(false);
            }
        };

        void fetchWallet();
        return () => {
            cancelled = true;
        };
    }, [])

    const handleActivateSubscription = async (subscriptionId: string) => {
        const subscription = subscriptions.find((item) => item.id === subscriptionId);
        if (
            !subscription ||
            subscription.package.type !== "PINNACLE" ||
            !subscription.hands.some((hand) => hand.status === "PENDING_ACTIVATION")
        ) {
            toast.error("This subscription is not eligible for activation.");
            return;
        }

        setActivatingSubscriptionId(subscriptionId);
        try {

            await claimSubscription({ subscriptionId: subscription.id });

            toast.success("Your Pinnacle subscription has been activated.");
            try {
                setSubscriptions(await listSubscriptions());
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Activation succeeded, but savings could not be refreshed: ${error.message}`
                        : "Activation succeeded, but savings could not be refreshed."
                );
            }
            try {
                const wallet = await getWallet();
                const balance = Number(wallet.availableBalance);
                if (!Number.isFinite(balance)) {
                    throw new Error("The wallet response did not include a valid available balance.");
                }
                setWalletBalance(balance);
                setWalletError(null);
            } catch (error) {
                setWalletError(
                    error instanceof Error ? error.message : "Unable to refresh wallet balance."
                );
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Unable to activate this subscription.");
        } finally {
            setActivatingSubscriptionId(null);
        }
    };

    const handleRetryOverduePayment = async (subscriptionId: string) => {
        const subscription = subscriptions.find((item) => item.id === subscriptionId);
        if (!subscription || !subscription.hands.some((hand) => (hand.overdue?.cycles ?? 0) > 0)) {
            toast.error("This subscription has no missed payment to retry.");
            return;
        }

        setRetryingSubscriptionId(subscriptionId);
        try {
            await retryOverDuePayment(subscription.id);
            toast.success("Missed payment retry submitted.");

            try {
                setSubscriptions(await listSubscriptions());
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Retry submitted, but savings could not be refreshed: ${error.message}`
                        : "Retry submitted, but savings could not be refreshed."
                );
            }

            try {
                const wallet = await getWallet();
                const balance = Number(wallet.availableBalance);
                if (!Number.isFinite(balance)) {
                    throw new Error("The wallet response did not include a valid available balance.");
                }
                setWalletBalance(balance);
                setWalletError(null);
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Retry submitted, but wallet balance could not be refreshed: ${error.message}`
                        : "Retry submitted, but wallet balance could not be refreshed."
                );
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Unable to retry the missed payment.");
        } finally {
            setRetryingSubscriptionId(null);
        }
    };

    return (
        <MemberDashboard
            subscriptions={subscriptions}
            subscriptionsLoading={subscriptionsLoading}
            walletBalance={walletBalance}
            walletLoading={walletLoading}
            walletError={walletError}
            onActivateSubscription={handleActivateSubscription}
            activatingSubscriptionId={activatingSubscriptionId}
            onRetryOverduePayment={handleRetryOverduePayment}
            retryingSubscriptionId={retryingSubscriptionId}
        />
    );
}