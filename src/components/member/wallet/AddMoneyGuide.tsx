import { ArrowDown, ArrowRight, Copy, Smartphone, Wallet } from "lucide-react";

type Account = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};

export default function AddMoneyGuide({
  account,
  onCopy,
}: {
  account: Account;
  onCopy: (value: string, label: string) => void;
}) {
  const hasAccountNumber = Boolean(account.accountNumber);
  const steps = [
    {
      title: "Copy your account details",
      description:
        "Copy the account number, account name and bank name shown above.",
    },
    {
      title: "Open your bank app",
      description:
        "Transfer any amount from your bank app to your dedicated account.",
    },
    {
      title: "Your wallet is updated",
      description:
        "Your wallet balance updates when your transfer is received.",
    },
  ];

  return (
    <section
      id="add-money"
      className="scroll-mt-24 rounded-2xl border border-surface-container-low bg-surface-container-lowest p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-surface-container-low pb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline text-base font-bold text-on-surface sm:text-lg">
            How to Add Money to Elevate Wallet
          </h2>
          <p className="mt-1 font-body text-xs text-outline">
            Bank transfer to your dedicated account is the only way to add
            money.
          </p>
        </div>
        <span className="w-fit rounded-full bg-secondary-container px-3 py-1.5 font-label-xs text-xs font-bold text-on-secondary-fixed-variant">
          Bank Transfer Only
        </span>
      </div>

      <div className="mt-5 rounded-xl border border-secondary-accent/30 bg-surface-container-low p-4 sm:p-5">
        <p className="mb-3 text-center font-label-xs text-xs font-bold uppercase tracking-wider text-outline sm:text-left">
          How your money moves
        </p>

        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-3">
          <FlowStep
            icon={<Smartphone size={20} />}
            title="1. Bank Transfer"
            description="From your bank app"
          />
          <ArrowRight className="mx-auto hidden text-primary-container sm:block" />
          <ArrowDown className="mx-auto text-primary-container sm:hidden" />
          <FlowStep
            icon={<span className="font-mono text-xs font-bold">₦</span>}
            title="2. Your Account"
            description={account.accountNumber || "Account details pending"}
            active
          />
          <ArrowRight className="mx-auto hidden text-primary-container sm:block" />
          <ArrowDown className="mx-auto text-primary-container sm:hidden" />
          <FlowStep
            icon={<Wallet size={20} />}
            title="3. Elevate Wallet"
            description="Balance updated"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-7">
          <h3 className="font-headline text-sm font-bold text-on-surface">Follow these 3 steps</h3>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex items-start gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-low p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
                {index + 1}
              </span>
              <div>
                <p className="font-headline text-sm font-bold text-on-surface">{step.title}</p>
                <p className="mt-1 font-body text-xs leading-relaxed text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-secondary-accent/30 bg-surface-container-low p-4 lg:col-span-5">
          <div>
            <p className="mb-3 font-label-xs text-xs font-bold uppercase tracking-wider text-on-surface">
              Quick copy
            </p>
            <div className="space-y-2 text-xs">
              {[
                ["Account Number", account.accountNumber],
                ["Account Name", account.accountName],
                ["Bank", account.bankName],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-2 rounded-lg border border-surface-container-low bg-surface-container-lowest p-2.5"
                >
                  <span className="text-outline">{label}</span>
                  <span className="max-w-[60%] break-all text-right font-label-xs font-semibold text-on-surface">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={!hasAccountNumber}
            onClick={() =>
              onCopy(
                `Bank: ${account.bankName}\nAccount Number: ${account.accountNumber}\nAccount Name: ${account.accountName}`,
                "Transfer details"
              )
            }
            className="mt-4 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-3 font-label-md text-sm font-bold text-on-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Copy size={15} />
            Copy All Transfer Details
          </button>
        </div>
      </div>
    </section>
  );
}

function FlowStep({
  icon,
  title,
  description,
  active = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border bg-white p-3 ${
        active ? "border-2 border-primary-container" : "border-surface-container-low"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container-low text-primary-container">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-label-xs text-xs font-bold text-on-surface">{title}</p>
        <p className="truncate font-body text-[11px] text-outline">{description}</p>
      </div>
    </div>
  );
}