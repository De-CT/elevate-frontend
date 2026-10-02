import type { WalletTransaction } from "./wallet-types";
import TransactionRow from "./TransactionRow";
import { Info, ReceiptText } from "lucide-react";

type Filter = "all" | "in" | "out";

export default function WalletHistory({
  transactions,
  filter,
  onFilterChange,
  onSelectTransaction,
}: {
  transactions: WalletTransaction[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onSelectTransaction: (transaction: WalletTransaction) => void;
}) {
  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Money Received (+)", value: "in" },
    { label: "Payments (-)", value: "out" },
  ];

  return (
    <section
      id="wallet-history"
      className="scroll-mt-24 rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-surface-container-low pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline text-base font-bold text-on-surface sm:text-lg">
            Wallet History
          </h2>
          <p className="mt-1 font-body text-xs text-outline">
            Money received and payments taken from your wallet.
          </p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => onFilterChange(item.value)}
              className={`shrink-0 rounded-lg px-3 py-2 font-label-xs text-xs font-bold transition ${
                filter === item.value
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 divide-y divide-outline-variant/30">
        {transactions.length ? (
          transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onClick={() => onSelectTransaction(transaction)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low text-primary-container">
              <ReceiptText className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="font-headline font-semibold text-on-surface">
              {filter === "all" ? "No wallet transactions yet" : "No matching transactions"}
            </p>
            <p className="mt-1 max-w-sm font-body text-sm text-outline">
              {filter === "all"
                ? "Money received and payments from your wallet will appear here."
                : "Try another history filter to see wallet activity."}
            </p>
            {filter === "all" && (
              <p className="mt-4 inline-flex items-center gap-2 font-label-xs text-xs font-semibold text-primary-container">
                <Info className="h-4 w-4" aria-hidden="true" />
                Add money to your wallet to get started.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}