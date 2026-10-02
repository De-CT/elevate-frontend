import { Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatMoney } from "./savings-utils";

interface Props {
  walletBalance: number;
  onManageWallet?: () => void;
}

export default function WalletNotice({ walletBalance }: Props) {
  return (
    <section className="flex flex-col justify-between gap-3 rounded-2xl border border-secondary-accent/30 bg-surface-container-low/70 p-4 sm:flex-row sm:items-center sm:p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg bg-surface-container-lowest p-2 text-primary shadow-sm">
          <Info size={18} />
        </span>
        <p className="font-body text-sm leading-relaxed text-on-surface-variant">
          Savings payments are taken automatically from your Elevate Wallet.
          Money available:{" "}
          <strong className="font-currency-card text-primary">
            {formatMoney(walletBalance)}
          </strong>
          .
        </p>
      </div>

      <Link
        href="/wallet"
        className="flex shrink-0 items-center gap-1 font-label-xs text-xs font-bold text-primary hover:underline"
      >
        Manage Wallet <ArrowRight size={14} />
      </Link>
    </section>
  );
}