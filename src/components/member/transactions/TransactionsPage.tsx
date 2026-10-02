"use client";

import { useEffect, useMemo, useState } from "react";
import { getWallet, getWalletHistory } from "@/backend/user";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { normalizeTransactions } from "./transactions-data";
import { Transaction, TransactionType } from "./transactions-types";
import TransactionsHeader from "./TransactionsHeader";
import TransactionSummary from "./TransactionSummary";
import TransactionToolbar from "./TransactionToolbar";
import TransactionList from "./TransactionList";
import TransactionDetails from "./TransactionDetails";
import TransactionSupport from "./TransactionSupport";

type WalletRecord = { availableBalance?: string | number };

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"all" | TransactionType>("all");
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {


    const loadHistory = async () => {
      const [historyResponse, walletResponse] = await Promise.all([
        getWalletHistory(),
        getWallet(),
      ]);

      const normalized = normalizeTransactions(historyResponse);
      console.log("normalized transactions", normalized);
      setError(null);
      setTransactions(normalized);
      setSelected(normalized[0] ?? null);
      const wallet = walletResponse as WalletRecord;
      setWalletBalance(Number(wallet.availableBalance) || 0);
    };

     loadHistory().catch((loadError: unknown) => {
 
      setError(loadError instanceof Error ? loadError.message : "Unable to load transaction history.");
    });

  }, [retryCount]);

  const filteredTransactions = useMemo(
    () =>
      (transactions ?? []).filter(
        (transaction) => filter === "all" || transaction.type === filter
      ),
    [filter, transactions]
  );

  const visibleSelection = filteredTransactions.find((item) => item.id === selected?.id)
    ?? filteredTransactions[0]
    ?? null;

  if (error) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 py-6 text-center sm:px-6 lg:px-8">
        <p role="alert" className="font-body text-sm text-on-surface-variant">{error}</p>
        <button
          type="button"
          onClick={() => setRetryCount((count) => count + 1)}
          className="rounded-full bg-primary px-5 py-3 font-label-md text-sm font-semibold text-on-primary hover:bg-primary-container"
        >
          Try again
        </button>
      </main>
    );
  }

  if (transactions === null) return <FullScreenLoader label="Loading transaction history..." />;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 pb-10 text-on-surface sm:px-6 lg:px-8">
      <TransactionsHeader />

      <TransactionSummary transactions={transactions} walletBalance={walletBalance} />

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <section className="flex min-w-0 flex-col gap-4 lg:col-span-7">
          <TransactionToolbar
            filter={filter}
            onFilterChange={setFilter}
            counts={{
              all: transactions.length,
              added: transactions.filter((item) => item.type === "added").length,
              savings: transactions.filter((item) => item.type === "savings").length,
            }}
          />

          <TransactionList
            transactions={filteredTransactions}
            selectedId={visibleSelection?.id}
            hasHistory={transactions.length > 0}
            onSelect={setSelected}
          />
        </section>

        <aside className="min-w-0 lg:sticky lg:top-20 lg:col-span-5">
          <TransactionDetails transaction={visibleSelection} />
        </aside>
      </div>

      <TransactionSupport />

    </main>
  );
}