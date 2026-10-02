// components/member/dashboard/WalletSummary.tsx
import Link from "next/link";
import { ArrowUpRight, Copy, Wallet } from "lucide-react";

type Props = {
  wallet: {
    balance: number;
    accountNumber: string;
    bankName: string;
  };
};

const naira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export function WalletSummary({ wallet }: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <div className="rounded-2xl bg-primary p-5 text-on-primary shadow-sm md:col-span-3 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-label-md text-sm text-white/80">
            <Wallet className="h-5 w-5" />
            Elevate Wallet
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            Active
          </span>
        </div>

        <p className="mt-6 font-label-md text-sm text-white/70">Money Available</p>
        <h1 className="mt-1 font-currency-display text-3xl font-bold tracking-tight sm:text-4xl">
          {naira(wallet.balance)}
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/wallet"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-secondary-fixed px-5 font-label-md text-sm font-bold text-primary transition hover:bg-primary-fixed-dim"
          >
            Add Money
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/wallet"
            className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 font-label-md text-sm font-semibold text-white hover:bg-white/10"
          >
            Wallet History
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm md:col-span-2">
        <div>
          <p className="font-headline text-sm font-semibold text-primary">
            Your Dedicated Account
          </p>
          <p className="mt-1 font-body text-xs text-outline">
            Transfer money here to fund your wallet.
          </p>
        </div>

        <div className="mt-5">
          <p className="font-body text-xs text-outline">{wallet.bankName || "Bank account pending"}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="font-mono text-xl font-bold tracking-wide text-primary">
              {wallet.accountNumber || "Not available yet"}
            </span>
            {wallet.accountNumber && (
              <button
                type="button"
                aria-label="Copy account number"
                onClick={() => navigator.clipboard?.writeText(wallet.accountNumber)}
                className="rounded-lg bg-surface p-2 text-primary-container hover:bg-surface-container"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 font-body text-xs leading-5 text-outline">
          Use this account number when making a bank transfer. Your wallet will
          be updated after the transfer is confirmed.
        </p>
      </div>
    </section>
  );
}