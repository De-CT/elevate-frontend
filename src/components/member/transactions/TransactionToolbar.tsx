import TransactionFilters from "./TransactionFilters";
import { TransactionType } from "./transactions-types";
import { ShieldCheck } from "lucide-react";

interface Props {
  filter: "all" | TransactionType;
  onFilterChange: (value: "all" | TransactionType) => void;
  counts: { all: number; added: number; savings: number };
}

export default function TransactionToolbar({
  filter,
  onFilterChange,
  counts,
}: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <TransactionFilters
        value={filter}
        onChange={onFilterChange}
        counts={counts}
      />

      <div className="flex items-center gap-2 px-1 text-xs text-on-surface-variant">
        <ShieldCheck size={16} className="text-secondary" />
        <span>Secure transaction records</span>
      </div>
    </div>
  );
}