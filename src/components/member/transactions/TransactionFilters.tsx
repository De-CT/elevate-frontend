import { TransactionType } from "./transactions-types";

interface Props {
  value: "all" | TransactionType;
  onChange: (value: "all" | TransactionType) => void;
  counts: { all: number; added: number; savings: number };
}

const filters = [
  { value: "all", label: "All" },
  { value: "added", label: "Money Added" },
  { value: "savings", label: "Savings Payments" },
] as const;

export default function TransactionFilters({
  value,
  onChange,
  counts,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = value === filter.value;
        const count = counts[filter.value];

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            aria-pressed={active}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${
              active
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            {filter.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                active ? "bg-white/15 text-white" : "bg-white/70"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}