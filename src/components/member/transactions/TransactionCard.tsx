import {
  ArrowDownLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  PiggyBank,
  Store,
} from "lucide-react";
import { Transaction } from "./transactions-types";
import { formatNaira } from "./transactions-data";

interface Props {
  transaction: Transaction;
  selected: boolean;
  onClick: () => void;
}

export default function TransactionCard({
  transaction,
  selected,
  onClick,
}: Props) {
  const isAdded = transaction.type === "added";
  const Icon = isAdded ? ArrowDownLeft : transaction.program === "Chop Beta" ? Store : PiggyBank;
  const statusLabel = {
    paid: "Paid",
    successful: "Successful",
    pending: "Pending",
    failed: "Failed",
    unknown: "Status unavailable",
  }[transaction.status];
  const statusStyle =
    transaction.status === "paid" || transaction.status === "successful"
      ? "bg-secondary text-on-secondary"
      : transaction.status === "failed"
        ? "bg-error-container text-on-error-container"
        : transaction.status === "pending"
          ? "bg-tertiary-fixed/40 text-tertiary"
          : "bg-surface-container text-on-surface-variant";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative w-full overflow-hidden rounded-xl p-4 text-left shadow-sm transition ${
        selected
          ? "bg-gradient-to-r from-surface-container-low to-surface-container-lowest ring-1 ring-primary/20"
          : "bg-surface-container-lowest hover:bg-surface-container-low/50"
      }`}
    >
      {selected && (
        <span className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isAdded
                ? "bg-secondary/10 text-secondary"
                : "bg-primary/10 text-primary"
            }`}
          >
            <Icon size={22} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-base font-semibold text-primary">
                {transaction.title}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusStyle}`}
              >
                {statusLabel}
              </span>
            </div>

            <p className="mt-0.5 truncate text-xs text-on-surface-variant">
              {transaction.description}
            </p>
            <p className="mt-1 text-[11px] text-on-surface-variant/80">
              {transaction.dateLabel}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span
            className={`font-display text-base font-bold tabular-nums ${
              isAdded ? "text-secondary" : "text-on-surface"
            }`}
          >
            {isAdded ? "+" : ""}
            {formatNaira(transaction.amount)}
          </span>

          <span className="mt-1 flex items-center gap-1 text-[11px] font-bold text-primary">
            {selected ? (
              <>
                Selected <Check size={13} />
              </>
            ) : (
              <>
                View Details <ArrowRight size={13} />
              </>
            )}
          </span>
        </div>
      </div>
    </button>
  );
}