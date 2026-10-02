import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { WalletTransaction } from "./wallet-types";

const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function TransactionRow({
  transaction,
  onClick,
}: {
  transaction: WalletTransaction;
  onClick: () => void;
}) {
  const isIncoming = transaction.type === "in";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[76px] w-full items-center justify-between gap-3 rounded-xl px-2 py-3.5 text-left transition hover:bg-surface-container-low"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isIncoming
            ? "bg-secondary-container text-secondary"
            : "bg-surface-container-low text-primary-container"
        }`}
      >
        {isIncoming ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-headline text-sm font-bold text-on-surface">
          {transaction.title}
          {transaction.type === "out" && transaction.details
            ? ` · ${transaction.details}`
            : ""}
        </span>
        <span className="mt-1 block font-body text-xs leading-relaxed text-outline">
          {transaction.description}
        </span>
        <span className="mt-1 block font-body text-[11px] text-outline-variant">
          {transaction.date}
        </span>
      </span>

      <span className="shrink-0 text-right">
        <span
          className={`block font-currency-card text-sm font-bold ${
            isIncoming ? "text-secondary" : "text-on-surface"
          }`}
        >
          {isIncoming ? "+" : "-"}
          {money(transaction.amount)}
        </span>
        <span className="mt-1 block font-body text-[11px] text-outline-variant">
          View details →
        </span>
      </span>
    </button>
  );
}