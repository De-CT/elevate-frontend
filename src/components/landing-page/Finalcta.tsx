import { CheckCircle2 } from "lucide-react";

const TRUST_POINTS = ["Community-Rooted Programs", "Dedicated Elevate Wallet", "Member Support"];

export function FinalCTA() {
  return (
    <section className="w-full bg-primary-dark text-on-primary py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
        <span className="px-4 py-1 rounded-full bg-primary text-aqua-brand font-sans text-xs font-bold uppercase tracking-wider">
          Community Foundation • Structured Contribution Journeys
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-on-primary leading-tight">
          Ready to begin your Elevate journey?
        </h2>
        <p className="font-sans text-base text-surface-container-highest max-w-2xl leading-8">
          Join a community built around opportunity, contribution, empowerment and growth.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/register"
            className="px-8 py-3.5 rounded-full bg-secondary-brand text-on-primary font-sans text-sm font-bold shadow-lg hover:bg-aqua-brand hover:text-on-surface transition-all"
          >
            Join Elevate Heart
          </a>
          <a
            href="#programs"
            className="px-8 py-3.5 rounded-full bg-white/10 text-on-primary font-sans text-sm font-bold hover:bg-white/20 transition-all"
          >
            Explore Programs
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-surface-dim font-sans text-xs">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-aqua-brand" />
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}