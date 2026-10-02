import { Transaction } from "./transactions-types";
import TransactionDateGroup from "./TransactionDateGroup";
import { CalendarClock, Wallet } from "lucide-react";

interface Props {
  transactions: Transaction[];
  selectedId?: string;
  hasHistory: boolean;
  onSelect: (transaction: Transaction) => void;
}

function groupTransactions(items: Transaction[]) {
  const groups = new Map<string, Transaction[]>();

  items.forEach((item) => {
    const existing = groups.get(item.dateLabel.split(",")[0]) ?? [];
    groups.set(item.dateLabel.split(",")[0], [...existing, item]);
  });

  // Preserve the original transaction order and use the first date label
  // as a simple group label. Replace this with API-provided date groups later.
  return Array.from(groups.entries()).map(([label, transactions]) => ({
    label,
    transactions,
  }));
}

export default function TransactionList({
  transactions,
  selectedId,
  hasHistory,
  onSelect,
}: Props) {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-surface-container-lowest px-6 py-14 text-center shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-low text-primary">
          {hasHistory ? <CalendarClock size={26} /> : <Wallet size={26} />}
        </div>
        <h3 className="font-display text-lg font-semibold text-primary">
          {hasHistory ? "No matching transactions" : "No transactions yet"}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-on-surface-variant">
          {hasHistory
            ? "There are no transactions in this category. Try a different filter."
            : "Wallet top-ups and savings payments will appear here when they happen."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {groupTransactions(transactions).map((group) => (
        <TransactionDateGroup
          key={group.label}
          label={group.label}
          transactions={group.transactions}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}

    </div>
  );
}