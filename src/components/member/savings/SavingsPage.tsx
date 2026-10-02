"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useUserStore, type UserProfile } from "@/store/useUserStore";
import { listPackages } from "@/backend/user";
import { useAppStore, type Package } from "@/store/useAppStore";

type SavingsPageProfile = {
  savingsPackages?: SavingsPackage[];
  wallet?: { availableBalance?: number; balance?: number };
  availableBalance?: number;
};

export default function SavingsPage() {
  const user = useUserStore((state) => state.user) as (UserProfile & SavingsPageProfile) | null;
  const savings = useMemo(() => user?.savingsPackages ?? [], [user?.savingsPackages]);
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
          statusFilter === "all" || item.status === statusFilter;

        return matchesProgram && matchesStatus;
      }),
    [savings, programFilter, statusFilter]
  );

  const totalSaved = savings.reduce(
    (total, item) => total + getSavedAmount(item),
    0
  );

  const handleStartSavings = (selection: NewSavingsSelection) => {
    // Connect this handler to your package activation/onboarding API.
    // Do not activate a package from the UI alone.
    setShowStartModal(false);
    toast.success(
      `${selection.program} selected. Continue to package activation.`
    );
  };

  const walletBalance = user?.wallet?.availableBalance ?? user?.wallet?.balance ?? user?.availableBalance ?? 0;
  const handleChooseProgram = (packageType?: Package["type"]) => {
    if (packageType) setSelectedProgramType(packageType);
    setShowStartModal(true);
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        <SavingsSummary
          totalSaved={totalSaved}
          packages={savings}
          onStart={() => handleChooseProgram()}
        />

        <WalletNotice
          walletBalance={walletBalance}
          onManageWallet={() => router.push("/wallet")}
        />

        <SavingsFilters
          program={programFilter}
          status={statusFilter}
          onProgramChange={setProgramFilter}
          onStatusChange={setStatusFilter}
        />

        {filteredSavings.length > 0 ? (
          <SavingsList
            savings={filteredSavings}
            onView={setSelectedSavings}
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
        onClose={() => setShowStartModal(false)}
        onSubmit={handleStartSavings}
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