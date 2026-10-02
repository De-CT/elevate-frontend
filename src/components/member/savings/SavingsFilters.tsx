import type { ProgramFilter, StatusFilter } from "./savings-types";

interface Props {
  program: ProgramFilter;
  status: StatusFilter;
  onProgramChange: (value: ProgramFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
}

const base =
  "whitespace-nowrap rounded-lg px-3 py-2 font-label-xs text-xs font-bold transition";
const active = "bg-primary text-on-primary";
const inactive = "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high";

export default function SavingsFilters({
  program,
  status,
  onProgramChange,
  onStatusChange,
}: Props) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-surface-container-low bg-surface-container-lowest p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 font-label-xs text-xs font-bold text-outline">
          Program:
        </span>
        {(["all", "Pinnacle", "Chop Beta"] as ProgramFilter[]).map((value) => (
          <button
            key={value}
            onClick={() => onProgramChange(value)}
            className={`${base} ${program === value ? active : inactive}`}
          >
            {value === "all" ? "All" : value}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 font-label-xs text-xs font-bold text-outline">
          Status:
        </span>
        {(["active", "completed", "all"] as StatusFilter[]).map((value) => (
          <button
            key={value}
            onClick={() => onStatusChange(value)}
            className={`${base} ${status === value ? active : inactive}`}
          >
            {value === "all"
              ? "All Status"
              : value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
}