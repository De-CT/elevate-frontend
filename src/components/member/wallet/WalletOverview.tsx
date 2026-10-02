import { Clock3, Info, Wallet } from "lucide-react";

type Props = {
  availableBalance: number;
  committedBalance: number;
  onAddMoney: () => void;
  onHistory: () => void;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function WalletOverview({
  availableBalance,
  committedBalance,
  onAddMoney,
  onHistory,
}: Props) {
  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6">
      <div>
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-surface-container-low p-2 text-primary-container">
              <Wallet size={20} />
            </span>
            <div>
              <p className="font-label-xs text-xs font-bold uppercase tracking-wider text-outline">
                Elevate Wallet
              </p>
            </div>
          </div>

          <button
            onClick={onHistory}
            className="flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-2 font-label-xs text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high"
          >
            <Clock3 size={14} />
            History
          </button>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="font-label-xs text-xs font-semibold uppercase tracking-wider text-outline">
              Money Available
            </p>
            <p className="mt-1 font-currency-display text-3xl font-bold tracking-tight text-primary-container sm:text-4xl">
              {money(availableBalance)}
            </p>
            <p className="mt-2 flex items-center gap-2 font-body text-sm font-medium text-on-surface-variant">
              <span className={`h-2.5 w-2.5 rounded-full ${availableBalance > 0 ? "bg-secondary" : "bg-outline-variant"}`} />
              {availableBalance > 0 ? "Available for savings payments" : "Add money to start using your wallet"}
            </p>
          </div>
          <div className="rounded-xl bg-surface-container-low p-4 sm:text-right">
            <p className="font-label-xs text-xs font-semibold uppercase tracking-wider text-outline">
              Committed to savings
            </p>
            <p className="mt-1 font-currency-card text-2xl font-bold tracking-tight text-on-surface">
              {money(committedBalance)}
            </p>
            <p className="mt-2 font-body text-sm text-on-surface-variant">
              {committedBalance > 0 ? "Reserved for your active plans" : "Nothing is currently committed"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary-container/15 bg-surface-container-low/70 p-4">
          <Info className="mt-0.5 shrink-0 text-primary-container" size={19} />
          <div className="font-body text-sm leading-relaxed text-on-surface-variant">
            <p className="mb-1 font-headline font-bold text-primary-container">
              Wallet money and savings are separate
            </p>
            <p>
              Wallet money is used to pay for your savings. Money already saved
              in your packages is kept separate.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}