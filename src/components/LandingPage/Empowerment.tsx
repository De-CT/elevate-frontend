import Image from "next/image";

const empowermentImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC6oMpqNEJe5ueRzAH9cH5kTqENt-UU0WtG11DoW3MmVvWFxivcIBkJBi97tORzl44qF0SxQ8vqQyWldWssB5_uLcXiOqYiZTJ1XHam5jpHhGblZ_VWYy5xMhAIgPq95xqu7of0zqBGY427rWFJbRpdlWppJAJN6ejxUX2EDgCeQZgxI1PmOYjGZ88wqM28PvVCG9eogUWTZUXH5oT6D2FKdlxk96lbqSiLUIu5Mg-6bExli4Wsx8Gv",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEqFu0eAJVY6kfMO5uQ_YwrtIByGqsAeiSsZkVT-_36CIzW_3D3bGXYlbXfhcB7d0orepYZip8PdK0d2HU4wyPOrv13XNsaJOnpI_9lJEo1230Mclu6iclzXQR1BqzJQgQZSh0uHeudZ-2tcUDNJfxGXiTgqbNHVntINBfxCWQqq4t51L8K-ZEd3AhRiTrJoafauosFUpxH2esCrowGC_qdwmPXwS_dLvON7sH2o0QwPP_uMl8onWK",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDh7EB_pUMRyB-440nPGrM39FDvu_9Cmllq97UYFqvADC17woWlHRdp9-gkwzkL9CMdHjUwwdhk4pRoEbD2zT13miBKRHmLENaMMQngge3q9we2YaeCcqfR8SDzmLeZZnEMzygspMuMizjYke0yNrTLEUCpurJFZvqzt-myBxaxbMUWKkQdfpTq12HtI9X8WBMbtoRBKNB8M-Nu3qVnRDwVi1_PcHLOZcoSAlB7J75mSPVFq7WQZTsf",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCB3MKBUj_Zptr-fCmA0bgS4vr2o63wi3vgQiqF3-fNUCGSUXsAu00TkXjibbhe1fQmr3vG1GeyTaqgA2gczq6E80A1_7lSWgPSpnpvteGBVwlmpeiDZY_iuDcE3jenzIaHi2312l1OrVXDatMArkxJOq75TTAg3oDkgHQuGaRCLggEyeOApckYSkACkkci5exGc1PzWzxCF4TGn4z89uQWcqMNW3b5DnS36t3pRqJ-Rxb_koIqMRmS",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8vX0Xr5nqu65zerOCsSYuZ8IWr8gz8kHWN_Bop8f1MgZEeKrGOJAlbnesgsHhibfeXWRIqtbpv8zKlVBME0U8BQGtEJUT2eChIQk_Q4E-2q2WM_UM7aV-KKMi5RgivoI4BMHalFfKFiHbfiEZtzBCAkP2cpKx7IQHdguFhpskmfJ4ow_CEePuObjZEtMXx_nOYvlVjP748Kx0EBpurSaqYv1lmuls097O0FgZOF7ozTBC4HzTn6_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAmKp9fZDfvNTSYvIm2IHC68MBcrEmFuyo7Gk7hehAAK4UcNSnmXduugMq6u7ayEOBj5JmfK7u5yXhgetHqS3X9yddA4aQO7Ga3AEAlril3MyJls5NuBOZMc24i7LRS-pZBExctFkNRx0XzCBoIdCuExme2ip_oVnZW8F-M03MrdopuG8RJOR49njHonbhDYz9T2k8VwkxHuOAY79cs2Q05FFUCdaqUzS6H7c227u1fdGWLOXsRGbLt",
];

const PILLARS = [
  {
    image: "/empowerment/education.jpg",
    tag: "Education",
    title: "Education & Skills Development",
    description:
      "Subsidizing educational supplies, providing learning tools, and running foundational literacy and digital skill sessions for underserved youth.",
  },
  {
    image: "/empowerment/mentorship.jpg",
    tag: "Mentorship",
    title: "Mentorship",
    description:
      "Structured guidance pairing experienced community mentors with aspiring young individuals to build leadership, ethics, and career confidence.",
  },
  {
    image: "/empowerment/opportunities.jpg",
    tag: "Opportunities",
    title: "Youth Opportunities",
    description:
      "Practical cohorts in technical and artisan crafts, opening doors to vocational self-reliance, apprenticeships, and collaborative ventures.",
  },
  {
    image: "/empowerment/women.jpg",
    tag: "Women",
    title: "Women Empowerment",
    description:
      "Capacity workshops, seed grants, and trading networks supporting female market entrepreneurs, micro-traders, and artisanal craftspeople.",
  },
  {
    image: "/empowerment/family.jpg",
    tag: "Family Relief",
    title: "Family Support",
    description:
      "Grassroots nutritional security outreaches and household support systems assisting vulnerable families, widows, and elderly residents.",
  },
  {
    image: "/empowerment/community.jpg",
    tag: "Community",
    title: "Community Development",
    description:
      "Civic health wellness check-ups, neighborhood sanitation partnerships, and shared initiatives fostering collective self-sufficiency.",
  },
];

export function Empowerment() {
  return (
    <section id="empowerment" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Community Foundation • Structured Contribution Journeys
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight mt-1">
            Community Empowerment
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl mt-1 leading-7">
            Elevate Heart Foundation designs and implements community welfare and
            capacity-building programs across key developmental areas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PILLARS.map((pillar, index) => (
          <div
            key={pillar.title}
            className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-surface-container flex flex-col gap-4"
          >
            <div className="h-44 w-full rounded-2xl overflow-hidden relative">
              <Image src={empowermentImages[index]} alt={pillar.title} fill className="object-cover"  loading="eager"/>
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-primary text-on-primary font-sans text-xs font-bold">
                {pillar.tag}
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-on-surface">{pillar.title}</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-7">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}