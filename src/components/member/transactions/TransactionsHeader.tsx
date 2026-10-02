"use client";

export default function TransactionsHeader() {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          Activity & Records
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
          Transaction History
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">
          See money added to your wallet and savings payments made from it.
          Every transaction is recorded here.
        </p>
      </div>

    </div>
  );
}