"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Info } from "lucide-react";
import { CustomButton } from "@/components/CustomButton";
import { listPackages } from "@/backend/user";
import { useAppStore, type RegistrationSelection } from "@/store/useAppStore";
import toast from "react-hot-toast";
import { BrandSpinner } from "@/components/BrandSpinner";

const PINNACLE_PRESETS = [1, 3, 5, 10];

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export type ProgramSelection = RegistrationSelection;

export function ChooseProgramStep({
  onSelect,
  loading,
}: {
  onSelect: (selection: ProgramSelection) => void;
  loading: boolean;
}) {
  const [pinnacleQty, setPinnacleQty] = useState(1);
  const [chopBetaQty, setChopBetaQty] = useState(1);
  const { activePackages, setActivePackages } = useAppStore();
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(activePackages === null);
  const accountLabel = pinnacleQty > 1 ? "accounts" : "account";
  const fetchPackages = async () => {
    if (activePackages !== null) return;
    try {
      const res = await listPackages()
      setActivePackages(res)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to load programs.";
      toast.error(message);
      setLoadError(message);
    } finally {
      setIsLoading(false)
    }
  }



  const packages = activePackages?.filter((packageData) => packageData.isActive) ?? [];
  const pinnaclePackage = packages.find((packageData) => packageData.type === "PINNACLE");
  const chopBetaPackage = packages.find((packageData) => packageData.type === "CHOP_BETA");

  const adjustQty = (delta: number) => setPinnacleQty((q) => Math.max(1, q + delta));

  const weeklyAmount = Number(pinnaclePackage?.weeklyAmount ?? 0);
  const registrationFee = Number(pinnaclePackage?.registrationFee ?? 0);
  const durationWeeks = pinnaclePackage?.durationWeeks ?? 0;
  const clearanceFee = Number(pinnaclePackage?.clearanceFee ?? 0);
  const referralBonus = Number(pinnaclePackage?.referralBonus ?? 0);
  const chopWeeklyAmount = Number(chopBetaPackage?.weeklyAmount ?? 0);
  const chopRegistrationFee = Number(chopBetaPackage?.registrationFee ?? 0);
  const chopDurationWeeks = chopBetaPackage?.durationWeeks ?? 0;
  const chopClearanceFee = Number(chopBetaPackage?.clearanceFee ?? 0);
  const chopAccountLabel = chopBetaQty > 1 ? "accounts" : "account";
  const chopWeeklyTotal = chopBetaQty * chopWeeklyAmount;
  const chopTotal = chopWeeklyTotal * chopDurationWeeks;

  const calc = useMemo(
    () => ({
      registration: pinnacleQty * registrationFee,
      weekly: pinnacleQty * weeklyAmount,
      payout: pinnacleQty * weeklyAmount * durationWeeks,
      totalBonus: pinnacleQty * referralBonus,
    }),
    [pinnacleQty, registrationFee, weeklyAmount, durationWeeks, referralBonus]
  );

  useEffect(() => {
    fetchPackages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-48 w-full items-center justify-center" aria-busy="true">
        <BrandSpinner label="Loading available programs..." />
      </div>
    );
  }
  if (loadError) return <p role="alert" className="text-error">{loadError}</p>;
  if (packages.length === 0) return <p className="text-on-surface-variant">No programs are currently available.</p>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="font-headline font-bold text-3xl sm:text-4xl text-primary tracking-tight">
          Choose Your Program
        </h1>
        <p className="font-body text-base sm:text-lg text-on-surface-variant mt-2">
          Pick the plan that works for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
        {/* PINNACLE */}
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-primary-container shadow-sm p-6 sm:p-8 flex flex-col justify-between relative">
          <div className="absolute -top-3 right-6 bg-primary text-on-primary text-xs font-headline font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
            Multi-Account Enabled
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary">Pinnacle</h2>
              <span className="px-3 py-1 rounded-full bg-surface-container-low text-primary font-headline font-semibold text-xs uppercase tracking-wide">
                Cash Plan
              </span>
            </div>
            <p className="font-body text-base text-on-surface font-medium mb-5">
              Save weekly toward a guaranteed cash payout at {durationWeeks}-week maturity.
            </p>

            <div className="bg-surface-container-low rounded-xl p-4 sm:p-5 mb-5 border border-surface-container">
              <label className="block font-headline font-bold text-sm text-primary mb-2">
                How many Pinnacle accounts would you like to start in this batch?
              </label>
              <div className="flex items-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => adjustQty(-1)}
                  className="w-11 h-11 rounded-lg bg-surface-container-lowest border-2 border-surface-container hover:border-primary text-primary font-headline font-bold text-xl flex items-center justify-center transition-colors cursor-pointer select-none active:scale-95"
                >
                  −
                </button>
                <div className="flex-1 h-11 bg-surface-container-lowest border-2 border-primary-container rounded-lg flex items-center justify-center font-headline font-bold text-xl text-primary">
                  <span>{pinnacleQty}</span>
                  <span className="text-xs font-body font-normal text-on-surface-variant ml-1.5">
                    {accountLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => adjustQty(1)}
                  className="w-11 h-11 rounded-lg bg-surface-container-lowest border-2 border-surface-container hover:border-primary text-primary font-headline font-bold text-xl flex items-center justify-center transition-colors cursor-pointer select-none active:scale-95"
                >
                  +
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {PINNACLE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPinnacleQty(preset)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-headline transition-colors cursor-pointer ${pinnacleQty === preset
                      ? "font-bold border-2 border-primary-container bg-primary-container text-on-primary shadow-sm"
                      : "font-semibold border border-surface-container bg-surface-container-lowest hover:bg-surface text-on-surface"
                      }`}
                  >
                    {preset} Acc
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-4 sm:p-5 space-y-3 mb-5">
              <div className="flex justify-between items-baseline text-sm sm:text-base">
                <span className="font-body text-on-surface-variant">Registration fee:</span>
                <span className="font-headline font-semibold text-primary">
                  {pinnacleQty} {accountLabel} × {naira(registrationFee)} ={" "}
                  <span className="font-bold">{naira(calc.registration)}</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline text-sm sm:text-base">
                <span className="font-body text-on-surface-variant">Weekly contribution:</span>
                <span className="font-headline font-semibold text-primary">
                  {pinnacleQty} {accountLabel} × {naira(weeklyAmount)} ={" "}
                  <span className="font-bold">{naira(calc.weekly)} / week</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline text-sm sm:text-base">
                <span className="font-body text-on-surface-variant">Duration:</span>
                <span className="font-headline font-bold text-primary">{durationWeeks} weeks</span>
              </div>
              <div className="h-px bg-surface-container-highest" />
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-body text-sm sm:text-base text-on-surface font-semibold">
                  Total cycle payout target:
                </span>
                <span className="font-headline font-bold text-xl sm:text-2xl text-primary">
                  {naira(calc.payout)}
                </span>
              </div>
              <p className="font-body text-xs text-on-surface-variant text-right">
                {pinnacleQty} {accountLabel} × {naira(weeklyAmount * durationWeeks)} = {naira(calc.payout)}
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-surface-container mb-5">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Notice:</strong> You will need {pinnacleQty} referrals
                using your single member code to qualify {pinnacleQty} {accountLabel} for their Bonus.
              </p>
            </div>

            <details className="group mb-6 text-sm">
              <summary className="cursor-pointer text-primary font-headline font-bold flex items-center gap-1.5 hover:underline py-1">
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                <span>See full details &amp; bonus breakdown</span>
              </summary>
              <div className="mt-3 p-4 rounded-xl bg-surface-container-low text-on-surface-variant font-body space-y-2 text-sm leading-relaxed">
                <p>
                  • <strong>Registration fee:</strong> {naira(registrationFee)} per account (one-time fee to activate
                  your plan).
                </p>
                <p>
                  • <strong>Clearance fee:</strong> {naira(clearanceFee)} per account at completion.
                </p>
                <div className="pt-1 text-tertiary">
                  • <strong>Referral bonus:</strong> Refer 1 member per account after 4 weeks to
                  qualify each account for a <strong>{naira(referralBonus)} bonus</strong> at maturity (
                  {naira(calc.totalBonus)} total potential bonus for {pinnacleQty} {accountLabel}).
                </div>
              </div>
            </details>
          </div>

          <CustomButton
            text={`Choose Pinnacle (${pinnacleQty} Account${pinnacleQty > 1 ? "s" : ""})`}
            fullWidth
            rightIcon={<ArrowRight className="w-5 h-5" />}
            disabled={!pinnaclePackage || loading}
            onClick={() => {
              if (pinnaclePackage) {
                onSelect({
                  packageType: pinnaclePackage.type,
                  quantity: pinnacleQty,
                });
              }
            }}
            loading={loading}
          />
        </div>

        {/* CHOP BETA */}
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-surface-container shadow-sm p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary">Chop Beta</h2>
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-headline font-semibold text-xs uppercase tracking-wide">
                Food Plan
              </span>
            </div>
            <p className="font-body text-base sm:text-lg text-on-surface font-medium mb-6">
              Get food supplies regularly for your household.
            </p>

            <div className="bg-surface-container-low rounded-xl p-4 sm:p-5 mb-5 border border-surface-container">
              <label className="block font-headline font-bold text-sm text-primary mb-2">
                How many Chop Beta accounts would you like to start?
              </label>
              <div className="flex items-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setChopBetaQty((quantity) => Math.max(1, quantity - 1))}
                  className="w-11 h-11 rounded-lg bg-surface-container-lowest border-2 border-surface-container hover:border-primary text-primary font-headline font-bold text-xl flex items-center justify-center transition-colors cursor-pointer select-none active:scale-95"
                  aria-label="Remove one Chop Beta account"
                >
                  −
                </button>
                <div className="flex-1 h-11 bg-surface-container-lowest border-2 border-primary-container rounded-lg flex items-center justify-center font-headline font-bold text-xl text-primary">
                  <span>{chopBetaQty}</span>
                  <span className="text-xs font-body font-normal text-on-surface-variant ml-1.5">
                    {chopAccountLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setChopBetaQty((quantity) => quantity + 1)}
                  className="w-11 h-11 rounded-lg bg-surface-container-lowest border-2 border-surface-container hover:border-primary text-primary font-headline font-bold text-xl flex items-center justify-center transition-colors cursor-pointer select-none active:scale-95"
                  aria-label="Add one Chop Beta account"
                >
                  +
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {PINNACLE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setChopBetaQty(preset)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-headline transition-colors cursor-pointer ${chopBetaQty === preset
                      ? "font-bold border-2 border-primary-container bg-primary-container text-on-primary shadow-sm"
                      : "font-semibold border border-surface-container bg-surface-container-lowest hover:bg-surface text-on-surface"
                      }`}
                  >
                    {preset} {preset === 1 ? "Acc" : "Accs"}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 sm:p-5 space-y-3 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-body text-sm sm:text-base text-on-surface-variant">
                  Weekly savings:
                </span>
                <span className="font-headline font-bold text-lg sm:text-xl text-primary">
                  {naira(chopWeeklyTotal)} / week
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-body text-sm sm:text-base text-on-surface-variant">
                  Duration:
                </span>
                <span className="font-headline font-bold text-lg sm:text-xl text-primary">
                  {chopDurationWeeks} weeks
                </span>
              </div>
              <div className="h-px bg-surface-container" />
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-body text-sm sm:text-base text-on-surface-variant">
                  Total saved:
                </span>
                <span className="font-headline font-bold text-2xl text-primary">{naira(chopTotal)}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container border border-surface-container mb-5">
              <CheckCircle2 className="w-6 h-6 text-secondary-accent shrink-0" />
              <p className="font-body text-sm sm:text-base text-on-surface font-semibold">
                Receive wholesome food supplies for your family (worth {naira(chopTotal)}) at maturity. Not
                paid in cash.
              </p>
            </div>

            <details className="group mb-6 text-sm">
              <summary className="cursor-pointer text-primary font-headline font-bold flex items-center gap-1.5 hover:underline py-1">
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                <span>See full details</span>
              </summary>
              <div className="mt-3 p-4 rounded-xl bg-surface-container-low text-on-surface-variant font-body space-y-2 text-sm leading-relaxed">
                <p>• <strong>Registration fee:</strong> {naira(chopRegistrationFee)}.</p>
                <p>• <strong>Clearance fee:</strong> {naira(chopClearanceFee)} at food collection.</p>
                <p>
                  • <strong>Supplies included:</strong> Premium rice, pure cooking oil, and
                  nutritious household food staples.
                </p>
              </div>
            </details>
          </div>

          <CustomButton
            text={`Choose ${chopBetaPackage?.name ?? "Chop Beta"}`}
            variant="secondary"
            fullWidth
            rightIcon={<ArrowRight className="w-5 h-5" />}
            disabled={!chopBetaPackage || loading}
            onClick={() => {
              if (chopBetaPackage) {
                onSelect({
                  packageType: chopBetaPackage.type,
                  quantity: chopBetaQty,
                });
              }
            }}
            loading={loading}
          />
        </div>
      </div>

      {/* <CustomButton
        text="Back to Account Details"
        variant="ghost"
        size="md"
        leftIcon={<ArrowLeft className="w-4 h-4" />}
        onClick={onBack}
        className="mt-6"
      /> */}
    </div>
  );
}