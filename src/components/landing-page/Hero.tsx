import Image from "next/image";
import { ArrowRight, Eye, Leaf, Users, Wallet, GraduationCap, Handshake, PersonStanding, Heart, type LucideIcon } from "lucide-react";
import emblemPng from "@/app/icon.png"


const CHARACTERISTICS: { icon: LucideIcon; label: string }[] = [
  { icon: Leaf, label: "Community-Rooted Programs" },
  { icon: Users, label: "Youth • Women • Families" },
  { icon: Wallet, label: "Dedicated Elevate Wallet" },
];

export function Hero() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-20 overflow-hidden">
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-0 w-80 h-80 rounded-full bg-tertiary-fixed opacity-30 blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-primary w-fit shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-brand animate-pulse" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider">
              Community Foundation • Structured Contribution Journeys
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-primary tracking-tight font-bold leading-[1.05]">
            Elevating Minds.
            <br />
            <span className="text-tertiary">Empowering</span> Lives.
          </h1>

          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl leading-8">
            Empowering individuals and underserved communities through education,
            skills development, mentorship, opportunity and compassionate support.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-sans text-sm font-bold shadow-md hover:bg-primary-container hover:shadow-lg transition-all"
            >
              Join Elevate Heart
              <ArrowRight className="w-[18px] h-[18px]" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface-container text-primary font-sans text-sm font-bold hover:bg-surface-container-highest transition-all"
            >
              Explore Programs
              <Eye className="w-[18px] h-[18px]" />
            </a>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-surface-container max-w-xl">
            {CHARACTERISTICS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <item.icon className="w-[18px] h-[18px] text-secondary-brand" />
                </div>
                <span className="font-sans text-[11px] text-on-surface-variant font-bold uppercase tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <HeroEmblem />
      </div>
    </section>
  );
}

function HeroEmblem() {
  return (
    <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
      <div className="w-full max-w-[380px] sm:max-w-[420px] flex flex-col items-center gap-6 relative z-10">
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-secondary-brand/20 bg-surface-container-low/40 animate-pulse pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-dashed border-secondary-brand/40 pointer-events-none" />
          <div className="absolute inset-10 rounded-full bg-surface-container-lowest/80 shadow-lg border border-surface-container flex items-center justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-3 bg-surface-container-low/60 flex items-center justify-center shadow-inner">
              <Image
                src={emblemPng}
                alt="Elevate Heart Foundation emblem"
                width={128}
                height={128}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <FloatingBadge icon={GraduationCap} label="Education" position="top-1 left-1/2 -translate-x-1/2" />
          <FloatingBadge icon={Handshake} label="Skills" position="right-0 top-1/2 -translate-y-1/2" />
          <FloatingBadge icon={PersonStanding} label="Mentorship" position="bottom-1 left-1/2 -translate-x-1/2" />
          <FloatingBadge icon={Heart} label="Support" position="left-0 top-1/2 -translate-y-1/2" />
        </div>

        <div className="w-full max-w-[320px] bg-surface-container-lowest/90 backdrop-blur-sm rounded-2xl shadow-sm px-4 py-3 border border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-sans text-sm text-on-surface font-bold">Elevate Wallet</h3>
                <span className="px-2 py-0.5 rounded-full font-sans text-[10px] uppercase tracking-wide bg-primary/10 text-primary font-medium">
                  Active
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant">Your central funding layer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({
  icon: Icon,
  label,
  position,
}: {
  icon: LucideIcon;
  label: string;
  position: string;
}) {
  return (
    <div
      className={`absolute ${position} px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container flex items-center gap-1.5`}
    >
      <Icon className="w-3 h-3 text-secondary-brand" />
      <span className="font-sans text-[11px] font-bold text-on-surface uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}