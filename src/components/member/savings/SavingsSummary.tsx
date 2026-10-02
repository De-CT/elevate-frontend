import { Plus, Wallet } from "lucide-react";
import type { SavingsPackage } from "./savings-types";
import { formatMoney } from "./savings-utils";

interface Props {
  totalSaved: number;
  packages: SavingsPackage[];
  onStart: () => void;
}

export default function SavingsSummary({
  totalSaved,
  packages,
  onStart,
}: Props) {
  const activePackages = packages.filter((item) => item.status === "active");

  return (
    <section className="flex flex-col justify-between gap-5 rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6 md:flex-row md:items-center">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-lg bg-surface-container-low p-2 text-primary">
            <Wallet size={19} />
          </span>
          <span className="font-label-xs text-xs font-bold uppercase tracking-wide text-outline">
            Total saved (all packages)
          </span>
        </div>

        <h2 className="font-currency-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {formatMoney(totalSaved)}
        </h2>

        <p className="mt-2 font-body text-xs leading-relaxed text-on-surface-variant">
          Active packages:{" "}
          <span className="font-label-md font-semibold text-primary">
            {activePackages.length
              ? activePackages
                  .map(
                    (item) =>
                      `${item.name} — ${item.hands.length} ${
                        item.hands.length === 1 ? "Hand" : "Hands"
                      }`
                  )
                  .join(" • ")
              : "None"}
          </span>
        </p>
      </div>

      <button
        onClick={onStart}
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-label-md text-sm font-bold text-on-primary transition hover:bg-primary-container"
      >
        <Plus size={17} />
        Start Another Savings
      </button>
    </section>
  );
}