import { Building2, Copy } from "lucide-react";

type Account = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};

type Props = {
  account: Account;
  onCopy: (value: string, label: string) => void;
};

function CopyButton({
  value,
  label,
  onCopy,
  primary = false,
}: {
  value: string;
  label: string;
  onCopy: Props["onCopy"];
  primary?: boolean;
}) {
  return (
    <button
      onClick={() => onCopy(value, label)}
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${
        primary
          ? "bg-primary-container text-on-primary hover:bg-primary"
          : "border border-primary-container/20 bg-surface text-primary-container hover:bg-surface-container-low"
      }`}
    >
      <Copy size={13} />
      Copy
    </button>
  );
}

export default function DedicatedAccountCard({ account, onCopy }: Props) {
  const hasAccountDetails = Boolean(account.bankName && account.accountNumber && account.accountName);

  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-secondary-accent/30 bg-surface-container-low/70 p-5 sm:p-6">
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-surface-container-lowest p-2 text-primary-container">
              <Building2 size={18} />
            </span>
            <h2 className="font-headline text-xs font-bold uppercase tracking-wide text-on-surface">
              Your Dedicated Account
            </h2>
          </div>
          <span className="rounded-full bg-primary-container px-2.5 py-1 text-[10px] font-bold uppercase text-on-primary">
            Personal
          </span>
        </div>

        {hasAccountDetails ? (
        <div className="space-y-4 rounded-xl border border-surface-container-low bg-surface-container-lowest p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-outline-variant/30 pb-3">
            <div>
              <p className="text-[11px] text-outline">Bank Name</p>
              <p className="mt-1 font-headline text-sm font-bold text-on-surface">
                {account.bankName}
              </p>
            </div>
            {/* <CopyButton
              value={account.bankName}
              label="Bank name"
              onCopy={onCopy}
            /> */}
          </div>

          <div className="border-b border-outline-variant/30 pb-3">
            <p className="text-[11px] text-outline">Dedicated Account Number</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="break-all font-mono text-2xl font-bold tracking-wider text-primary-container">
                {account.accountNumber}
              </p>
              <CopyButton
                value={account.accountNumber}
                label="Account number"
                onCopy={onCopy}
                primary
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-outline">Account Name</p>
              <p className="mt-1 font-headline text-sm font-bold text-on-surface">
                {account.accountName}
              </p>
            </div>
            {/* <CopyButton
              value={account.accountName}
              label="Account name"
              onCopy={onCopy}
            /> */}
          </div>
        </div>
        ) : (
          <p className="rounded-xl border border-surface-container-low bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface-variant">
            Your dedicated bank account details are not available yet.
          </p>
        )}

        <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">
          Transfer money to this account to fund your Elevate Wallet. This
          account is created for you.
        </p>
      </div>

      {/* <button
        disabled={!hasAccountDetails}
        onClick={() =>
          onCopy(
            `Bank: ${account.bankName}\nAccount Number: ${account.accountNumber}\nAccount Name: ${account.accountName}`,
            "Transfer details"
          )
        }
        className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-primary-container bg-surface-container-lowest px-4 py-2.5 text-sm font-bold text-primary-container hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Copy size={16} />
        Copy All Account Details
      </button> */}
    </section>
  );
}