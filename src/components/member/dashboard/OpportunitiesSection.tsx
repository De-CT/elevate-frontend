// components/member/dashboard/OpportunitiesSection.tsx
import Link from "next/link";
import { ArrowUpRight, BookOpen, GraduationCap } from "lucide-react";

type Opportunity = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export function OpportunitiesSection({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-headline text-xl font-bold text-primary">
          Opportunities for You
        </h2>
        <p className="mt-1 font-body text-sm text-outline">
          Programs provided by Elevate Heart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {opportunities.map((item) => {
          const Icon =
            item.icon === "graduation" ? GraduationCap : BookOpen;

          return (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-surface-container-high/70 bg-surface-container-lowest p-5 shadow-[0_4px_16px_rgba(0,77,58,0.05)]"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-headline font-bold text-on-surface">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-outline">
                  {item.description}
                </p>
              </div>

              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1 font-label-md text-sm font-bold text-secondary hover:underline"
              >
                Explore opportunity
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}