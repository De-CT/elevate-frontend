import { BrandSpinner } from "@/components/BrandSpinner";

export function FullScreenLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-surface px-6 text-on-surface"
      aria-busy="true"
    >
      <BrandSpinner
        size={72}
        markSrc="/icon.png"
        label={label}
        className="text-primary"
        labelClassName="font-body text-base font-medium text-on-surface-variant"
      />
    </div>
  );
}
