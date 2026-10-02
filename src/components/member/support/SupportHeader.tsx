import { LifeBuoy } from "lucide-react";

export default function SupportHeader() {
  return (
    <header className="space-y-4">

      <div className="flex items-start gap-3">
        <div className="hidden rounded-2xl bg-surface-container-low p-3 text-primary sm:block">
          <LifeBuoy size={28} />
        </div>

        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            How can we help?
          </h1>
          <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-on-surface-variant md:text-base">
            Find simple answers to your questions, or speak directly with our
            community support team.
          </p>
        </div>
      </div>
    </header>
  );
}