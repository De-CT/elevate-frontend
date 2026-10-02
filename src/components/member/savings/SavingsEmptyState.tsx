import { ArrowRight, HandCoins, ShoppingBasket, Store, Wallet } from "lucide-react";
import type { Package } from "@/store/useAppStore";

interface Props {
  hasSavings: boolean;
  availablePrograms?: Package[];
  programsLoading?: boolean;
  programsError?: boolean;
  onStart: (packageType?: Package["type"]) => void;
}

const money = (value: string) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function SavingsEmptyState({
  hasSavings,
  availablePrograms = [],
  programsLoading = false,
  programsError = false,
  onStart,
}: Props) {
  return (
    <section className="rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      {hasSavings ? (
        <div className="py-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-low text-primary">
            <Wallet size={26} aria-hidden="true" />
          </div>
          <h3 className="font-headline text-lg font-bold text-on-surface">No packages found</h3>
          <p className="mx-auto mt-2 max-w-sm font-body text-sm text-outline">
            Try changing the program or status filter.
          </p>
        </div>
      ) : (
        <>
          <div className="py-4 text-center sm:py-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface text-primary">
              <HandCoins size={30} aria-hidden="true" />
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface">You have no savings yet</h3>
            <p className="mx-auto mt-1 max-w-md font-body text-sm text-outline">
              Choose a program to start saving towards your goals.
            </p>
            <button
              type="button"
              onClick={() => onStart()}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-3 font-label-md text-sm font-bold text-on-primary hover:bg-primary-container"
            >
              <HandCoins size={17} aria-hidden="true" />
              Start a Savings Program
            </button>
          </div>

          <div className="border-t border-surface-container-low pt-5 text-left">
            <h4 className="mb-4 font-label-xs text-xs font-bold uppercase tracking-wider text-outline sm:text-left">
              Available Savings Programs
            </h4>
            {programsLoading ? (
              <p className="py-6 text-center font-body text-sm text-outline">Loading programs...</p>
            ) : programsError ? (
              <p role="alert" className="py-6 text-center font-body text-sm text-error">
                Programs could not be loaded. Please try again later.
              </p>
            ) : availablePrograms.length === 0 ? (
              <p className="py-6 text-center font-body text-sm text-outline">
                No savings programs are available right now.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {availablePrograms.map((program) => {
                  const isChopBeta = program.type === "CHOP_BETA";
                  const Icon = isChopBeta ? ShoppingBasket : Store;

                  return (
                    <article
                      key={program.id}
                      className="flex flex-col justify-between rounded-xl border border-surface-container-low bg-surface p-5 transition hover:border-secondary-accent/50"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-primary">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <div>
                          <h5 className="font-headline text-base font-bold text-on-surface">
                            {program.name} Program
                          </h5>
                          <p className="mt-1 font-body text-xs leading-relaxed text-on-surface-variant">
                            {isChopBeta
                              ? "Structured food security savings with foodstuff fulfillment."
                              : "Flexible weekly savings for business and personal goals."}
                          </p>
                          <p className="mt-2 font-label-xs text-xs font-semibold text-secondary">
                            {money(program.weeklyAmount)} per week · {program.durationWeeks} weeks
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onStart(program.type)}
                        className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-surface-container-high bg-surface-container-lowest px-4 py-2 font-label-xs text-xs font-bold text-on-surface hover:border-secondary-accent hover:text-primary"
                      >
                        Learn More &amp; Join
                        <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}