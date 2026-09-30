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
        <h2 className="text-xl font-bold text-[#004D3A]">
          Opportunities for You
        </h2>
        <p className="mt-1 text-sm text-[#6F7A74]">
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
              className="flex flex-col justify-between rounded-2xl border border-[#D3EEE6]/70 bg-white p-5 shadow-[0_4px_16px_rgba(0,77,58,0.05)]"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A0F3D4] text-[#004D3A]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 font-bold text-[#071F1B]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6F7A74]">
                  {item.description}
                </p>
              </div>

              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#006B54] hover:underline"
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