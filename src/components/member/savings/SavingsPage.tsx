"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import type {
  NewSavingsSelection,
  ProgramFilter,
  SavingsPackage,
  StatusFilter,
} from "./savings-types";
import { getSavedAmount } from "./savings-utils";

import SavingsSummary from "./SavingsSummary";
import WalletNotice from "./WalletNotice";
import SavingsFilters from "./SavingsFilters";
import SavingsList from "./SavingsList";
import SavingsEmptyState from "./SavingsEmptyState";
import StartSavingsModal from "./StartSavingsModal";
import SavingsDetailsModal from "./SavingsDetailsModal";
import {
  claimSubscription,
  getWallet,
  listPackages,
  listSubscriptions,
  subscribeToPackage,
} from "@/backend/user";
import {
  getRegistrationSubscriptions,
  useAppStore,
  type Package,
  type RegistrationSubscription,
} from "@/store/useAppStore";
import type { Subscription } from "@/types/subscription";
import { toSavingsPackage } from "@/utils/subscription-mapping";

export default function SavingsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);
  const [subscriptionsError, setSubscriptionsError] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activatingSubscriptionId, setActivatingSubscriptionId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pendingClaims, setPendingClaims] = useState<RegistrationSubscription[] | null>(null);
  const [pendingClaimPackageType, setPendingClaimPackageType] =
    useState<Package["type"] | null>(null);
  const [showDepositReminder, setShowDepositReminder] = useState(false);
  const savings = useMemo(
    () => subscriptions?.map(toSavingsPackage) ?? [],
    [subscriptions]
  );
  const activePackages = useAppStore((state) => state.activePackages);
  const setActivePackages = useAppStore((state) => state.setActivePackages);
  const [packagesLoading, setPackagesLoading] = useState(activePackages === null);
  const [packagesError, setPackagesError] = useState(false);
  const [programFilter, setProgramFilter] = useState<ProgramFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("active");
  const [selectedSavings, setSelectedSavings] =
    useState<SavingsPackage | null>(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [selectedProgramType, setSelectedProgramType] = useState<Package["type"] | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const loadSubscriptions = async () => {
      try {
        const result = await listSubscriptions();
        if (!cancelled) setSubscriptions(result);
      } catch (error) {
        if (!cancelled) {
          setSubscriptionsError(
            error instanceof Error ? error.message : "Unable to load your subscriptions."
          );
        }
      }
    };

    const loadWallet = async () => {
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
          setWalletError(
            error instanceof Error ? error.message : "Unable to load your wallet balance."
          );
        }
      }
    };

    void loadSubscriptions();
    void loadWallet();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activePackages !== null) return;
    let cancelled = false;

    const loadPackages = async () => {
      setPackagesLoading(true);
      setPackagesError(false);
      try {
        const result: Package[] = await listPackages();
        if (!cancelled) setActivePackages(result.filter((item) => item.isActive));
      } catch {
        if (!cancelled) setPackagesError(true);
      } finally {
        if (!cancelled) setPackagesLoading(false);
      }
    };

    void loadPackages();
    return () => {
      cancelled = true;
    };
  }, [activePackages, setActivePackages]);

  const filteredSavings = useMemo(
    () =>
      savings.filter((item) => {
        const matchesProgram =
          programFilter === "all" || item.name === programFilter;
        const matchesStatus =
          statusFilter === "all" ||
          item.status === statusFilter ||
          (statusFilter === "active" && item.status === "pending-activation");

        return matchesProgram && matchesStatus;
      }),
    [savings, programFilter, statusFilter]
  );

  const totalSaved = savings.reduce(
    (total, item) => total + getSavedAmount(item),
    0
  );

  const handleActivateSubscription = async (subscription: SavingsPackage) => {
    setActivatingSubscriptionId(subscription.id);
    try {
      const pendingHands = subscription.hands.filter(
        (hand) => hand.status === "pending-activation"
      );
      if (pendingHands.length === 0 || subscription.name !== "Pinnacle") {
        throw new Error("This subscription is not eligible for activation.");
      }

      if (subscription.hands.length > 1) {
        await claimSubscription({ groupId: subscription.id });
      } else {
        await claimSubscription({ subscriptionId: subscription.id });
      }

      toast.success("Your Pinnacle registration was claimed.");

      try {
        setSubscriptions(await listSubscriptions());
        setSubscriptionsError(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? `Your registration was claimed, but the subscription list could not be refreshed: ${error.message}`
            : "Your registration was claimed, but the subscription list could not be refreshed."
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
        if (balance <= 0) setShowDepositReminder(true);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? `Your registration was claimed, but the wallet balance could not be refreshed: ${error.message}`
            : "Your registration was claimed, but the wallet balance could not be refreshed."
        );
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to activate this Pinnacle subscription.";
      toast.error(message);
    } finally {
      setActivatingSubscriptionId(null);
    }
  };

  const handleStartSavings = async (selection: NewSavingsSelection) => {
    setSubmitError(null);
    setIsSubmitting(true);
    let subscriptionCreated = false;
    const packageType = pendingClaimPackageType ?? selection.packageType;

    try {
      if (selection.packageType === "CHOP_BETA" && pendingClaims === null) {
        const response = await subscribeToPackage({
          packageType: selection.packageType,
          quantity: selection.hands,
        });
        const createdSubscriptions = getRegistrationSubscriptions(response);
        if (!createdSubscriptions.length || createdSubscriptions.some((item) => !item.id)) {
          throw new Error("The subscription response was missing subscription details.");
        }

        subscriptionCreated = true;
        setShowStartModal(false);
        toast.success("Your Chop Beta subscription is active.");
        try {
          setSubscriptions(await listSubscriptions());
          setSubscriptionsError(null);
        } catch (error) {
          toast.error(
            error instanceof Error
              ? `Your subscription is active, but the list could not be refreshed: ${error.message}`
              : "Your subscription is active, but the list could not be refreshed."
          );
        }
        return;
      }

      let claims = pendingClaims;
      if (claims === null) {
        const response = await subscribeToPackage({
          packageType: selection.packageType,
          quantity: selection.hands,
        });
        claims = getRegistrationSubscriptions(response);
        if (!claims.length || claims.some((item) => !item.id)) {
          throw new Error("The subscription response was missing subscription details.");
        }
        subscriptionCreated = true;
        setSelectedProgramType(selection.packageType);
        setPendingClaimPackageType(selection.packageType);
        setPendingClaims(claims);
      }

      let remainingClaims = claims;
      while (remainingClaims.length > 0) {
        const [subscription, ...remaining] = remainingClaims;
        if (subscription.hands && subscription.hands.length > 1) {
          await claimSubscription({ groupId: subscription.id });
        } else {
          await claimSubscription({ subscriptionId: subscription.id });
        }
        remainingClaims = remaining;
        setPendingClaims(remainingClaims);
      }

      setPendingClaims(null);
      setPendingClaimPackageType(null);
      setShowStartModal(false);
      toast.success("Your savings subscription has been claimed.");

      try {
        const refreshedSubscriptions = await listSubscriptions();
        setSubscriptions(refreshedSubscriptions);
        setSubscriptionsError(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? `Your subscription was claimed, but the list could not be refreshed: ${error.message}`
            : "Your subscription was claimed, but the list could not be refreshed."
        );
      }

      let latestWalletBalance: number | null = null;
      try {
        const wallet = await getWallet();
        const refreshedBalance = Number(wallet.availableBalance);
        if (!Number.isFinite(refreshedBalance)) {
          throw new Error("The wallet response did not include a valid available balance.");
        }
        latestWalletBalance = refreshedBalance;
        setWalletBalance(latestWalletBalance);
        setWalletError(null);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? `Your subscription was claimed, but the wallet balance could not be refreshed: ${error.message}`
            : "Your subscription was claimed, but the wallet balance could not be refreshed."
        );
      }

      const currentBalance = latestWalletBalance ?? walletBalance;
      if (packageType === "PINNACLE" && currentBalance !== null && currentBalance <= 0) {
        setShowDepositReminder(true);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to claim this savings subscription.";
      setSubmitError(message);
      toast.error(message);

      if (subscriptionCreated) {
        try {
          setSubscriptions(await listSubscriptions());
        } catch (refreshError) {
          toast.error(
            refreshError instanceof Error
              ? `The subscription was created, but could not be refreshed: ${refreshError.message}`
              : "The subscription was created, but could not be refreshed."
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChooseProgram = (packageType?: Package["type"]) => {
    if (packageType && pendingClaims === null) setSelectedProgramType(packageType);
    setSubmitError(null);
    setShowStartModal(true);
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        {subscriptionsError && (
          <p role="alert" className="rounded-xl bg-error-container p-4 text-sm text-on-error-container">
            {subscriptionsError}
          </p>
        )}
        <SavingsSummary
          totalSaved={totalSaved}
          packages={savings}
          onStart={() => handleChooseProgram()}
        />

        <WalletNotice
          walletBalance={walletBalance}
          walletError={walletError}
          onManageWallet={() => router.push("/wallet")}
        />

        {showDepositReminder && (
          <section
            role="status"
            aria-live="polite"
            className="flex flex-col justify-between gap-3 rounded-2xl border border-tertiary-fixed-dim/50 bg-tertiary-fixed/30 p-4 sm:flex-row sm:items-center sm:p-5"
          >
            <p className="font-body text-sm leading-relaxed text-on-surface-variant">
              Your Pinnacle subscription is claimed, but your wallet has no available balance.
              Deposit money into your Elevate Wallet to cover upcoming contributions. The
              backend will debit your wallet automatically when funds become available.
            </p>
            <Link
              href="/wallet"
              className="flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2.5 font-label-md text-sm font-semibold text-on-primary hover:bg-primary-container"
            >
              Deposit money
            </Link>
          </section>
        )}

        <SavingsFilters
          program={programFilter}
          status={statusFilter}
          onProgramChange={setProgramFilter}
          onStatusChange={setStatusFilter}
        />

        {subscriptions === null && !subscriptionsError ? (
          <p className="py-10 text-center font-body text-sm text-outline" aria-live="polite">
            Loading your subscriptions...
          </p>
        ) : filteredSavings.length > 0 ? (
          <SavingsList
            savings={filteredSavings}
            onView={setSelectedSavings}
            onActivate={handleActivateSubscription}
            activatingSubscriptionId={activatingSubscriptionId}
          />
        ) : (
          <SavingsEmptyState
            hasSavings={savings.length > 0}
            availablePrograms={activePackages ?? []}
            programsLoading={packagesLoading}
            programsError={packagesError}
            onStart={handleChooseProgram}
          />
        )}
      </main>

      <StartSavingsModal
        open={showStartModal}
        isSubmitting={isSubmitting}
        isSelectionLocked={pendingClaims !== null}
        onClose={() => setShowStartModal(false)}
        onSubmit={handleStartSavings}
        submitError={submitError}
        packages={activePackages ?? []}
        selectedProgramType={selectedProgramType}
        onSelectProgram={setSelectedProgramType}
      />

      <SavingsDetailsModal
        savings={selectedSavings}
        onClose={() => setSelectedSavings(null)}
      />

    </>
  );
}