import {
  ArrowDownLeft,
  CheckCircle2,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Transaction } from "./transactions-types";
import { formatNaira } from "./transactions-data";

interface Props {
  transaction: Transaction | null;
}

export default function TransactionDetails({ transaction }: Props) {
  if (!transaction) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-surface-container-lowest p-6 text-center shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low text-primary">
          <Wallet size={22} aria-hidden="true" />
        </div>
        <h2 className="font-display text-lg font-semibold text-primary">Transaction details</h2>
        <p className="mt-1 max-w-xs text-sm text-on-surface-variant">
          Select a transaction to see its details.
        </p>
      </div>
    );
  }

  const isAdded = transaction.type === "added";

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl bg-surface-container-lowest p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3 border-b border-surface-container pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Transaction Overview
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-primary">
              {isAdded ? "Wallet Funding" : "Savings Payment"}
            </h2>
          </div>

          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
            transaction.status === "failed"
              ? "bg-error-container text-on-error-container"
              : transaction.status === "pending"
                ? "bg-tertiary-fixed/40 text-tertiary"
                : transaction.status === "unknown"
                  ? "bg-surface-container text-on-surface-variant"
                  : "bg-secondary text-on-secondary"
          }`}>
            {transaction.status === "successful" || transaction.status === "paid" ? <CheckCircle2 size={13} /> : null}
            {transaction.status === "paid" ? "Paid" : transaction.status === "successful" ? "Successful" : transaction.status === "pending" ? "Pending" : transaction.status === "failed" ? "Failed" : "Status unavailable"}
          </span>
        </div>

        <div className="my-4 rounded-xl bg-surface-container-low p-5 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            {isAdded ? "Amount Added" : "Amount Paid"}
          </p>
          <p className="mt-1 font-display text-3xl font-bold tabular-nums text-primary">
            {formatNaira(transaction.amount)}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-on-surface-variant">
            {isAdded ? (
              <ArrowDownLeft size={15} className="text-secondary" />
            ) : (
              <PiggyBank size={15} className="text-secondary" />
            )}
            {transaction.program}
            {transaction.contributionLabel
              ? ` · ${transaction.contributionLabel}`
              : ""}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <DetailRow label="Transaction" value={transaction.title} />
          <DetailRow
            label="Plan"
            value={transaction.plan ?? "—"}
          />
          <DetailRow
            label="Payment method"
            value={transaction.method}
            icon={<Wallet size={15} />}
          />
          <DetailRow label="Date & time" value={transaction.dateLabel} />
        </div>

        <div className="mt-5 space-y-2 rounded-lg bg-surface-container-low p-3">
          <DetailRow
            label="Transaction reference"
            value={transaction.reference}
            mono
          />
          <DetailRow
            label="Receipt reference"
            value={transaction.receiptReference ?? "Not available"}
            mono
          />
        </div>

      </section>

      <section className="flex gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <ShieldCheck size={21} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-primary">
            Your records, clearly kept
          </h3>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">
            Keep this transaction reference if you need help with a payment.
            Our support team can use it to find the record.
          </p>
        </div>
      </section>
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon,
  mono,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-xs text-on-surface-variant">{label}</span>
      <span
        className={`flex min-w-0 items-center gap-1 text-right text-xs font-semibold text-on-surface ${
          mono ? "break-all font-mono" : ""
        }`}
      >
        {icon && <span className="text-primary">{icon}</span>}
        {value}
      </span>
    </div>
  );
}