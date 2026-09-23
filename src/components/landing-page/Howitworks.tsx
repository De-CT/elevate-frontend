import { UserPlus, SlidersHorizontal, Wallet, Clock, BadgeCheck, Info, type LucideIcon } from "lucide-react";

const STEPS: {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}[] = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create an Account",
    description: "Simple member registration and immediate provisioning of your central Elevate Wallet.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Choose a Program",
    description: "Select Pinnacle (12 weeks) or Chop Beta (5 months). Members can run multiple hands in one package.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Fund Your Elevate Wallet",
    description: "Securely fund your single central Elevate Wallet via dedicated virtual bank transfer anytime.",
  },
  {
    number: "04",
    icon: Clock,
    title: "Weekly Contributions",
    description:
      "Automated or manual weekly allocations deducted directly from your central wallet to each active savings account.",
  },
  {
    number: "05",
    icon: BadgeCheck,
    title: "Reach Maturity",
    description:
      "Complete your timeline, clear final administrative requirements, and access your financial payout or foodstuff package.",
    iconColor: "text-secondary",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-surface-container-low py-20 px-4 md:px-8 border-y border-surface-container">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Community Foundation • Structured Contribution Journeys
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight mt-2">
            How Elevate Heart Works
          </h2>
          <p className="font-sans text-base text-on-surface-variant mt-2 leading-7">
            A disciplined 5-step journey built around member commitment, structured
            savings, and verified benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between h-full"
            >
              <div className="flex flex-col gap-3">
                <span className="font-display text-2xl font-bold text-surface-dim">{step.number}</span>
                <div
                  className={`w-10 h-10 rounded-xl bg-surface-container-high ${step.iconColor ?? "text-primary"} flex items-center justify-center`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-base font-bold text-on-surface">{step.title}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-6">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-surface-container flex items-center gap-3 max-w-3xl mx-auto border border-surface-container-high">
          <Info className="w-6 h-6 text-primary shrink-0" />
          <p className="font-sans text-xs text-on-surface-variant leading-6">
            <strong className="text-on-surface">Central Wallet vs. Savings Accounts:</strong>{" "}
            Your single <strong>Elevate Wallet</strong> acts as the central deposit
            layer. You can create multiple individual <strong>savings accounts
            (sub-accounts)</strong> under this wallet to manage separate Pinnacle
            and Chop Beta journeys simultaneously.
          </p>
        </div>
      </div>
    </section>
  );
}