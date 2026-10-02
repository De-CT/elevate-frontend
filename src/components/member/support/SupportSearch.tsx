import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SupportSearch({ value, onChange }: Props) {
  return (
    <div className="relative max-w-2xl">
      <Search
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type a question or topic, e.g. wallet or savings..."
        aria-label="Search support questions"
        className="w-full rounded-2xl border border-surface-container-high bg-surface-container-lowest py-3.5 pl-12 pr-12 font-body text-sm text-on-surface shadow-sm outline-none transition placeholder:text-outline focus:border-secondary-accent focus:ring-2 focus:ring-secondary-accent/20 md:text-base"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}