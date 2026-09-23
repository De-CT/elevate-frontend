import { GraduationCap, PersonStanding, Users, Handshake, type LucideIcon } from "lucide-react";

const PILLARS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: GraduationCap,
    title: "Education & Skills",
    description:
      "Equipping youths and community members with vocational skills, practical training, and educational tools for self-reliance.",
  },
  {
    icon: PersonStanding,
    title: "Youth Empowerment",
    description:
      "Mentorship initiatives, leadership development, and guidance toward productive career and entrepreneurial opportunities.",
  },
  {
    icon: Users,
    title: "Women & Family Support",
    description:
      "Micro-grants, family relief, and resources aimed at strengthening households and women-led initiatives.",
  },
  {
    icon: Handshake,
    title: "Community Opportunities",
    description:
      "Collaborative grassroots networks, civic outreaches, and structured programs built on mutual trust.",
  },
];

export function Purpose() {
  return (
    <section className="w-full bg-primary-dark text-on-primary py-16 px-4 md:px-8 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        <div className="max-w-3xl">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-aqua-brand">
            Foundation Pillars
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-on-primary mt-2 font-bold tracking-tight">
            Built Around Purpose
          </h2>
          <p className="font-sans text-base sm:text-lg text-surface-container-highest mt-3 leading-8">
            Elevate Heart Foundation exists to create practical pathways for people
            and communities to learn, grow, contribute and thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-aqua-brand/20 text-aqua-brand flex items-center justify-center">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-on-primary">{pillar.title}</h3>
              <p className="font-sans text-sm text-surface-dim leading-7">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}