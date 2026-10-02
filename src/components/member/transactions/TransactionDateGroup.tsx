import { Transaction } from "./transactions-types";
import TransactionCard from "./TransactionCard";

interface Props {
  label: string;
  transactions: Transaction[];
  selectedId?: string;
  onSelect: (transaction: Transaction) => void;
}

export default function TransactionDateGroup({
  label,
  transactions,
  selectedId,
  onSelect,
}: Props) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-3 px-1">
        <h3 className="shrink-0 text-sm font-bold text-primary">{label}</h3>
        <div className="h-px flex-1 bg-surface-container-high" />
        <span className="shrink-0 text-xs text-on-surface-variant">
          {transactions.length}{" "}
          {transactions.length === 1 ? "Transaction" : "Transactions"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            selected={selectedId === transaction.id}
            onClick={() => onSelect(transaction)}
          />
        ))}
      </div>
    </section>
  );
}