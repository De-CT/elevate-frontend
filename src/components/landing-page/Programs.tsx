import { BrandSpinner } from "@/components/BrandSpinner";
import {
  Star,
  CalendarCheck,
  ShieldCheck,
  UtensilsCrossed,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Package } from "@/store/useAppStore";

type ProgramFeature = {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
};

type Program = {
  id: string;
  eyebrow: string;
  name: string;
  subtitle: string;
  duration: string;
  durationUnit: string;
  accentBar: string;
  nameColor: string;
  badgeColor: string;
  ctaBg: string;
  ctaHoverBg: string;
  ctaText: string;
  linkColor: string;
  highlights: { label: string; value: string; valueColor?: string; suffix?: string }[];
  features: ProgramFeature[];
  ctaLabel: string;
};

const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

function toProgram(packageData: Package): Program | null {
  const weeklyAmount = Number(packageData.weeklyAmount);
  const registrationFee = Number(packageData.registrationFee);
  const referralBonus = Number(packageData.referralBonus);
  const clearanceFee = Number(packageData.clearanceFee);
  const totalContribution = weeklyAmount * packageData.durationWeeks;
  const durationMonths = packageData.durationWeeks / 4;
  const isPinnacle = packageData.type === "PINNACLE";

  const presentation = isPinnacle
    ? {
    eyebrow: "Structured Sprint",
    accentBar: "bg-secondary-brand",
    nameColor: "text-primary",
    badgeColor: "text-primary",
    ctaBg: "bg-primary",
    ctaHoverBg: "hover:bg-primary-container",
    ctaText: "text-on-primary",
    linkColor: "text-primary",
    features: [
      {
        icon: Star,
        iconBg: "bg-tertiary-fixed",
        iconColor: "text-tertiary",
        title: "Referral Opportunity & Incentive",
        description:
          `One referral opportunity per savings account after 4 weeks. Earns a ${naira(referralBonus)} referral incentive when successfully qualified.`,
      },
      {
        icon: CalendarCheck,
        iconBg: "bg-secondary-fixed",
        iconColor: "text-on-secondary-fixed",
        title: "Transparent Maturity Process",
        description:
          `An administrative clearance of ${naira(clearanceFee)} applies upon completion of Week ${packageData.durationWeeks}. Payout is processed directly from your savings account.`,
      },
      {
        icon: ShieldCheck,
        iconBg: "bg-surface-container-high",
        iconColor: "text-on-surface-variant",
        title: "Accountability Discipline",
        description:
          "A default fee applies to missed weekly contributions — full terms are confirmed at signup. Contributions are strictly non-withdrawable prior to maturity.",
      },
    ],
    ctaLabel: "Start Pinnacle Journey",
    }
    : packageData.type === "CHOP_BETA"
      ? {
    eyebrow: "Household Security",
    accentBar: "bg-tertiary",
    nameColor: "text-tertiary",
    badgeColor: "text-tertiary",
    ctaBg: "bg-tertiary",
    ctaHoverBg: "hover:bg-tertiary-container",
    ctaText: "text-on-tertiary",
    linkColor: "text-tertiary",
    features: [
      {
        icon: UtensilsCrossed,
        iconBg: "bg-secondary-fixed",
        iconColor: "text-on-secondary-fixed",
        title: "Nutritional Foodstuff Benefit",
        description:
          `${packageData.durationWeeks} weeks duration, ${naira(weeklyAmount)} per week, with a foodstuff benefit upon completion: staple nutritional goods including 50kg rice, vegetable oil, beans, and essentials (not cash).`,
      },
      {
        icon: Users,
        iconBg: "bg-tertiary-fixed",
        iconColor: "text-tertiary",
        title: "No Referral Obligation & Flexible Hands",
        description:
          "Referral is not required to complete Chop Beta. Members can run multiple hands in one package and receive full packages at designated partner depots.",
      },
      {
        icon: AlertTriangle,
        iconBg: "bg-surface-container-high",
        iconColor: "text-on-surface-variant",
        title: "Default Terms & Non-Withdrawal",
        description:
          `A default fee applies to missed weekly payments. Contributions are non-withdrawable prior to maturity; a ${naira(clearanceFee)} administrative clearance applies prior to benefit distribution.`,
      },
    ],
    ctaLabel: "Join Chop Beta",
      }
      : null;

  if (!presentation) return null;

  return {
    id: packageData.id,
    name: packageData.name.toUpperCase(),
    subtitle: `${packageData.durationWeeks}-Week Member Contribution Journey`,
    duration: String(packageData.durationWeeks),
    durationUnit: "Weeks",
    highlights: [
      {
        label: "Registration Fee",
        value: registrationFee ? naira(registrationFee) : "No Fee",
        valueColor: registrationFee ? undefined : "text-secondary-brand",
      },
      {
        label: "Weekly Contribution",
        value: naira(weeklyAmount),
        valueColor: isPinnacle ? "text-primary" : "text-tertiary",
      },
      { label: "Total Contribution", value: naira(totalContribution) },
      { label: "Clearance Fee", value: clearanceFee ? naira(clearanceFee) : "No Fee" },
    ],
    ...presentation,
  };
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden border border-surface-container">
      <div className={`absolute top-0 left-0 right-0 h-3 ${program.accentBar}`} />
      <div>
        <div className="flex items-center justify-between pb-6">
          <div>
            <span className={`font-sans text-xs ${program.badgeColor} uppercase font-bold tracking-wider`}>
              {program.eyebrow}
            </span>
            <h3 className={`font-display text-3xl font-bold ${program.nameColor}`}>
              {program.name}
            </h3>
            <p className="font-sans text-sm text-on-surface-variant">{program.subtitle}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-2xl bg-surface-container-low ${program.nameColor} flex flex-col items-center justify-center border border-surface-container`}
          >
            <span className="font-display text-lg font-bold leading-tight">{program.duration}</span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-wider">{program.durationUnit}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5 rounded-2xl bg-surface-container-low mb-6 border border-surface-container">
          {program.highlights.map((h) => (
            <div key={h.label}>
              <p className="font-sans text-[11px] font-semibold text-on-surface-variant">{h.label}</p>
              <p className={`font-sans text-base font-bold ${h.valueColor ?? "text-on-surface"}`}>
                {h.value}
                {h.suffix && (
                  <span className="text-xs font-normal text-on-surface-variant font-sans"> {h.suffix}</span>
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {program.features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full ${feature.iconBg} ${feature.iconColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <feature.icon className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-sans text-sm text-on-surface font-bold">{feature.title}</p>
                <p className="font-sans text-sm text-on-surface-variant leading-6">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <a
          href={`/register?packageId=${encodeURIComponent(program.id)}`}
          className={`w-full py-3.5 rounded-full ${program.ctaBg} ${program.ctaText} font-sans text-sm text-center font-bold shadow-md ${program.ctaHoverBg} transition-all`}
        >
          {program.ctaLabel}
        </a>
        <a
          href="#programs"
          className={`text-center font-sans text-sm ${program.linkColor} hover:underline flex items-center justify-center gap-1 font-semibold`}
        >
          View full program details <span className="text-base">→</span>
        </a>
      </div>
    </div>
  );
}

export function Programs({ activePackages }: { activePackages: Package[] | null }) {
  const programs = activePackages?.filter((packageData) => packageData.isActive).flatMap((packageData) => {
    const program = toProgram(packageData);
    return program ? [program] : [];
  });

  return (
    <section id="programs" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-sans text-xs font-bold uppercase tracking-wider mb-3">
            Our Contribution Journeys
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight">
            Structured Contribution Programs
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mt-1 leading-7">
            Predictable timelines, disciplined member contributions, and clear
            outcomes organized by Elevate Heart Foundation.
          </p>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-sans text-sm">
          <CheckCircle2 className="w-4 h-4 text-secondary-brand" />
          Multiple simultaneous savings accounts permitted
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {programs?.map((program) => (
          <ProgramCard key={program.name} program={program} />
        ))}
        {activePackages === null && (
          <div className="col-span-full flex min-h-48 items-center justify-center" aria-busy="true">
            <BrandSpinner label="Loading programs..." />
          </div>
        )}
        {activePackages !== null && programs?.length === 0 && (
          <p className="text-on-surface-variant">No programs are currently available.</p>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <a
          href="#programs"
          className="px-8 py-3.5 rounded-full bg-primary text-on-primary font-sans text-sm font-bold shadow-md hover:bg-primary-container transition-all inline-flex items-center gap-2"
        >
          Explore Programs
          <ArrowRight className="w-[18px] h-[18px]" />
        </a>
      </div>
    </section>
  );
}