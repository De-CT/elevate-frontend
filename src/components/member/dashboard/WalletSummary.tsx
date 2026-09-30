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
      <div className="rounded-2xl bg-[#004D3A] p-5 text-white shadow-sm md:col-span-3 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Wallet className="h-5 w-5" />
            Elevate Wallet
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            Active
          </span>
        </div>

        <p className="mt-6 text-sm text-white/70">Money Available</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          {naira(wallet.balance)}
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/wallet"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#6DFAD0] px-5 text-sm font-bold text-[#004D3A] transition hover:bg-[#85D6B8]"
          >
            Add Money
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/wallet"
            className="inline-flex h-11 items-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Wallet History
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl border border-[#D3EEE6] bg-white p-5 shadow-sm md:col-span-2">
        <div>
          <p className="text-sm font-semibold text-[#004D3A]">
            Your Dedicated Account
          </p>
          <p className="mt-1 text-xs text-[#6F7A74]">
            Transfer money here to fund your wallet.
          </p>
        </div>

        <div className="mt-5">
          <p className="text-xs text-[#6F7A74]">{wallet.bankName || "Bank account pending"}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xl font-bold tracking-wide text-[#004D3A]">
              {wallet.accountNumber || "Not available yet"}
            </span>
            {wallet.accountNumber && (
              <button
                type="button"
                aria-label="Copy account number"
                onClick={() => navigator.clipboard?.writeText(wallet.accountNumber)}
                className="rounded-lg bg-[#E5FFF7] p-2 text-[#00674F] hover:bg-[#D9F4EB]"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#6F7A74]">
          Use this account number when making a bank transfer. Your wallet will
          be updated after the transfer is confirmed.
        </p>
      </div>
    </section>
  );
}