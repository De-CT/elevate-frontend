import { Flag, Lightbulb, Scale, Lock, Heart, Handshake, type LucideIcon } from "lucide-react";

const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Scale,
    title: "Radical Transparency",
    description: "Clear operational guidelines, documented ledger balances, and open member communication.",
  },
  {
    icon: Lock,
    title: "Community Accountability",
    description: "Disciplined weekly timelines ensuring fairness, reliability, and security for all participating members.",
  },
  {
    icon: Heart,
    title: "Human Compassion",
    description: "Grounding every initiative in empathy, household nutritional security, and practical grassroots care.",
  },
  {
    icon: Handshake,
    title: "Uncompromising Integrity",
    description: "Honoring all timeline commitments, member trust, and community welfare pledges without exception.",
  },
];

export function MissionVision() {
  return (
    <section className="w-full bg-surface-container py-20 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <Flag className="w-6 h-6" />
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">
              Our Purpose
            </span>
            <h3 className="font-display text-2xl text-primary font-bold">
              The Foundation Mission
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-7">
              &ldquo;To build stronger communities by equipping youth, women and
              families with opportunities and support to achieve sustainable
              growth and well-being.&rdquo;
            </p>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-tertiary">
              Our North Star
            </span>
            <h3 className="font-display text-2xl text-primary font-bold">
              The Foundation Vision
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-7">
              &ldquo;A world where lives and every heart has the chance to reach
              its full potential and thrive with dignity.&rdquo;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="p-6 rounded-2xl bg-surface-container-lowest text-center border border-surface-container flex flex-col items-center"
            >
              <value.icon className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-display text-sm font-bold text-on-surface">{value.title}</h4>
              <p className="font-sans text-xs text-on-surface-variant mt-1 leading-6">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}