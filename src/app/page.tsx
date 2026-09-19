import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Check,
  ChevronDown,
  Clock3,
  HandHeart,
  Heart,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

import Image from "next/image";
import logoImage from "../assets/images/elevate-heart-secondary-logo-no-bg.png";
import footerLogoImage from "../assets/images/logo.png";

const emblemUrl =
  "/icon.png";

const empowermentImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC6oMpqNEJe5ueRzAH9cH5kTqENt-UU0WtG11DoW3MmVvWFxivcIBkJBi97tORzl44qF0SxQ8vqQyWldWssB5_uLcXiOqYiZTJ1XHam5jpHhGblZ_VWYy5xMhAIgPq95xqu7of0zqBGY427rWFJbRpdlWppJAJN6ejxUX2EDgCeQZgxI1PmOYjGZ88wqM28PvVCG9eogUWTZUXH5oT6D2FKdlxk96lbqSiLUIu5Mg-6bExli4Wsx8Gv",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEqFu0eAJVY6kfMO5uQ_YwrtIByGqsAeiSsZkVT-_36CIzW_3D3bGXYlbXfhcB7d0orepYZip8PdK0d2HU4wyPOrv13XNsaJOnpI_9lJEo1230Mclu6iclzXQR1BqzJQgQZSh0uHeudZ-2tcUDNJfxGXiTgqbNHVntINBfxCWQqq4t51L8K-ZEd3AhRiTrJoafauosFUpxH2esCrowGC_qdwmPXwS_dLvON7sH2o0QwPP_uMl8onWK",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDh7EB_pUMRyB-440nPGrM39FDvu_9Cmllq97UYFqvADC17woWlHRdp9-gkwzkL9CMdHjUwwdhk4pRoEbD2zT13miBKRHmLENaMMQngge3q9we2YaeCcqfR8SDzmLeZZnEMzygspMuMizjYke0yNrTLEUCpurJFZvqzt-myBxaxbMUWKkQdfpTq12HtI9X8WBMbtoRBKNB8M-Nu3qVnRDwVi1_PcHLOZcoSAlB7J75mSPVFq7WQZTsf",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCB3MKBUj_Zptr-fCmA0bgS4vr2o63wi3vgQiqF3-fNUCGSUXsAu00TkXjibbhe1fQmr3vG1GeyTaqgA2gczq6E80A1_7lSWgPSpnpvteGBVwlmpeiDZY_iuDcE3jenzIaHi2312l1OrVXDatMArkxJOq75TTAg3oDkgHQuGaRCLggEyeOApckYSkACkkci5exGc1PzWzxCF4TGn4z89uQWcqMNW3b5DnS36t3pRqJ-Rxb_koIqMRmS",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8vX0Xr5nqu65zerOCsSYuZ8IWr8gz8kHWN_Bop8f1MgZEeKrGOJAlbnesgsHhibfeXWRIqtbpv8zKlVBME0U8BQGtEJUT2eChIQk_Q4E-2q2WM_UM7aV-KKMi5RgivoI4BMHalFfKFiHbfiEZtzBCAkP2cpKx7IQHdguFhpskmfJ4ow_CEePuObjZEtMXx_nOYvlVjP748Kx0EBpurSaqYv1lmuls097O0FgZOF7ozTBC4HzTn6_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAmKp9fZDfvNTSYvIm2IHC68MBcrEmFuyo7Gk7hehAAK4UcNSnmXduugMq6u7ayEOBj5JmfK7u5yXhgetHqS3X9yddA4aQO7Ga3AEAlril3MyJls5NuBOZMc24i7LRS-pZBExctFkNRx0XzCBoIdCuExme2ip_oVnZW8F-M03MrdopuG8RJOR49njHonbhDYz9T2k8VwkxHuOAY79cs2Q05FFUCdaqUzS6H7c227u1fdGWLOXsRGbLt",
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Programs", href: "#programs" },
  { label: "Empowerment", href: "#empowerment" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const empowermentCards = [
  {
    title: "Education & Skills",
    label: "Education",
    description:
      "Creating access to learning, practical skills and tools that can help people build confidence and opportunities.",
    icon: School,
  },
  {
    title: "Youth Empowerment",
    label: "Youth",
    description:
      "Supporting young people through mentorship, guidance, skills development and opportunities for growth.",
    icon: Users,
  },
  {
    title: "Women & Family Support",
    label: "Families",
    description:
      "Supporting women and families through practical community initiatives designed around everyday needs.",
    icon: HandHeart,
  },
  {
    title: "Community Opportunities",
    label: "Opportunities",
    description:
      "Connecting people with practical opportunities that encourage learning, participation and sustainable growth.",
    icon: Sparkles,
  },
  {
    title: "Mentorship",
    label: "Mentorship",
    description:
      "Building supportive relationships that help individuals learn, make informed choices and grow with confidence.",
    icon: MessageCircle,
  },
  {
    title: "Community Support",
    label: "Support",
    description:
      "Working with communities to provide compassionate support and initiatives that strengthen everyday well-being.",
    icon: Heart,
  },
];

const faqs = [
  {
    question: "What is Elevate Heart Foundation?",
    answer:
      "Elevate Heart Foundation is an organization focused on empowering individuals and underserved communities through education, skills development, mentorship, opportunities and compassionate support.",
  },
  {
    question: "What is Pinnacle?",
    answer:
      "Pinnacle is a 12-week savings program. It has a ₦3,000 registration fee and each hand saves ₦5,000 every week for 12 weeks, making ₦60,000 saved per hand. Members can choose multiple hands under one Pinnacle package.",
  },
  {
    question: "How does the Pinnacle referral work?",
    answer:
      "After Week 4, a Pinnacle package receives one referral code. The code represents the whole package, not individual hands. The number of successful referrals allowed is equal to the number of hands in the package. Each successful referral earns a ₦20,000 reward.",
  },
  {
    question: "What is Chop Beta?",
    answer:
      "Chop Beta is a 5-month savings program. Each hand saves ₦30,000 every month for 5 months, making ₦150,000 saved per hand. There is no registration fee, and the completion benefit is foodstuff rather than cash.",
  },
  {
    question: "What is the Elevate Wallet?",
    answer:
      "The Elevate Wallet is your central place for money on the platform. You fund it by making a bank transfer to the dedicated account provided for you. Money received into the account is added to your wallet and can then be used for your savings payments.",
  },
  {
    question: "Can I have multiple hands?",
    answer:
      "Yes. You can choose multiple hands when joining a package. The hands belong to the same package, start together and follow the same program duration.",
  },
  {
    question: "What happens if I miss a Pinnacle payment?",
    answer:
      "If a Pinnacle weekly payment cannot be taken because there is not enough money in your wallet, the affected hand has a ₦5,000 default charge. The payment and default charge make the manual recovery amount ₦10,000 for that hand.",
  },
  {
    question: "What happens if I miss a Chop Beta payment?",
    answer:
      "If a Chop Beta monthly payment cannot be taken because there is not enough money in your wallet, the affected hand has a ₦2,000 default charge. The manual recovery amount is therefore ₦32,000 for that hand.",
  },
  {
    question: "Can I withdraw money from my savings before completion?",
    answer:
      "No. Money already saved in an active Pinnacle or Chop Beta package cannot be withdrawn before the package is completed. Money that remains available in your Elevate Wallet is separate from your savings.",
  },
  {
    question: "When is a package completed?",
    answer:
      "A package is completed only when all of its hands finish the required program period. For Pinnacle, that is 12 weeks. For Chop Beta, that is 5 months.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7FFF6] text-[#071F1B]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#D9F4EB]/70 bg-[#F7FFF6]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <Image
              src={footerLogoImage}
              alt="Elevate Heart Foundation"
              width={150}
              height={20}
              objectFit="contain"
              className="object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[#3F4944] transition hover:text-[#00674F]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#00674F] transition hover:bg-[#D9F4EB] sm:inline-flex"
            >
              Sign In
            </Link>

            <Link
              href="/join"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#00674F] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#004D3A]"
            >
              <span>Join Elevate</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              aria-label="Open navigation"
              className="rounded-full p-2 text-[#00674F] hover:bg-[#D9F4EB] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#52F2CC]/20 blur-3xl" />
        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-[#E3238A]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#BEEFE0] bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#00674F] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#16BE97]" />
              Community • Opportunity • Support
            </div>

            <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight text-[#004D3A] sm:text-6xl lg:text-7xl">
              Elevating Minds.
              <br />
              <span className="text-[#E3238A]">Empowering</span> Lives.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#3F4944] sm:text-lg">
              We empower individuals and underserved communities through
              education, skills development, mentorship, opportunity and
              compassionate support.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 rounded-full bg-[#00674F] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#004D3A]"
              >
                Join Elevate Heart
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#00674F] shadow-sm ring-1 ring-[#D9F4EB] transition hover:bg-[#D9F4EB]"
              >
                Explore Programs
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 border-t border-[#D9F4EB] pt-6 sm:grid-cols-3">
              <TrustItem icon={HandHeart} text="Community-rooted programs" />
              <TrustItem icon={Users} text="Youth • Women • Families" />
              <TrustItem icon={Wallet} text="Dedicated Elevate Wallet" />
            </div>
          </div>

          {/* Hero visual */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative flex w-full max-w-[430px] flex-col items-center">
              <div className="relative flex h-[330px] w-[330px] items-center justify-center sm:h-[390px] sm:w-[390px]">
                <div className="absolute inset-0 rounded-full border border-[#16BE97]/20 bg-[#D9F4EB]/30" />
                <div className="absolute inset-5 rounded-full border border-dashed border-[#16BE97]/40" />

                <div className="absolute inset-12 flex items-center justify-center rounded-full border border-[#D9F4EB] bg-white shadow-xl">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#D9F4EB] p-4 shadow-inner sm:h-36 sm:w-36">
                    <Image
                      src={emblemUrl}
                      alt="Elevate Heart Foundation emblem"
                      className="h-full w-full object-contain"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>

                <PillarBadge
                  icon={School}
                  label="Education"
                  className="left-1/2 top-0 -translate-x-1/2"
                />

                <PillarBadge
                  icon={Sparkles}
                  label="Skills"
                  className="right-0 top-1/2 -translate-y-1/2"
                />

                <PillarBadge
                  icon={MessageCircle}
                  label="Mentorship"
                  className="bottom-0 left-1/2 -translate-x-1/2"
                />

                <PillarBadge
                  icon={Heart}
                  label="Support"
                  className="left-0 top-1/2 -translate-y-1/2"
                />
              </div>

              <div className="mt-4 flex w-full max-w-[340px] items-center gap-3 rounded-2xl border border-[#D9F4EB] bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D9F4EB] text-[#00674F]">
                  <Wallet className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-[#071F1B]">
                    Elevate Wallet
                  </p>
                  <p className="mt-0.5 text-xs text-[#6F7A74]">
                    One central place for your available money.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / PURPOSE */}
      <section
        id="about"
        className="bg-[#00674F] px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#52F2CC]">
              Our Foundation
            </span>

            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
              Built Around Purpose
            </h2>

            <p className="mt-4 text-base leading-8 text-[#D9F4EB] sm:text-lg">
              Elevate Heart Foundation exists to create practical pathways for
              people and communities to learn, grow, contribute and thrive.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <PurposeCard
              icon={School}
              title="Education & Skills"
              text="Equipping people with learning opportunities, practical skills and tools for growth."
            />

            <PurposeCard
              icon={Users}
              title="Youth Empowerment"
              text="Supporting young people through mentorship, guidance and opportunities."
            />

            <PurposeCard
              icon={HandHeart}
              title="Women & Family Support"
              text="Creating practical support initiatives for women, families and communities."
            />

            <PurposeCard
              icon={Sparkles}
              title="Community Opportunities"
              text="Connecting people with opportunities that encourage participation and sustainable growth."
            />
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="bg-[#D9F4EB]/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              icon={Heart}
              eyebrow="Our Mission"
              title="Building Stronger Communities"
              text="To build stronger communities by equipping youth, women and families with opportunities and support to achieve sustainable growth and well-being."
            />

            <InfoCard
              icon={Sparkles}
              eyebrow="Our Vision"
              title="Every Heart Has A Chance"
              text="A world where lives and every heart has the chance to reach its full potential and thrive with dignity."
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ValueCard
              icon={ShieldCheck}
              title="Transparency"
              text="Clear information and honest communication."
            />
            <ValueCard
              icon={Users}
              title="Accountability"
              text="Taking responsibility for our programs and commitments."
            />
            <ValueCard
              icon={Heart}
              title="Compassion"
              text="Putting people and their everyday needs at the heart of our work."
            />
            <ValueCard
              icon={HandHeart}
              title="Integrity"
              text="Doing what is right and treating people with dignity."
            />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section
        id="programs"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="Our Programs"
          title="Save With A Clear Purpose"
          description="Choose a program, select how many hands you want, and use your Elevate Wallet to make your scheduled payments."
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {/* PINNACLE */}
          <ProgramCard
            accent="teal"
            name="PINNACLE"
            label="12-Week Savings Program"
            duration="12 Weeks"
            stats={[
              ["Registration", "₦3,000"],
              ["Per Hand", "₦5,000 / week"],
              ["Total / Hand", "₦60,000"],
            ]}
          >
            <ProgramFeature
              icon={Users}
              title="Choose Your Hands"
              text="You can choose multiple hands under one Pinnacle package. All hands start together and follow the same 12-week period."
            />

            <ProgramFeature
              icon={Sparkles}
              title="One Package Referral Code"
              text="After Week 4, your package receives one referral code. Referral capacity matches the number of hands, and each successful referral earns ₦20,000."
            />

            <ProgramFeature
              icon={Clock3}
              title="Weekly Payments"
              text="₦5,000 is taken each week for each active hand from your Elevate Wallet."
            />

            <ProgramFeature
              icon={ShieldCheck}
              title="Missed Payment"
              text="A missed weekly payment has a ₦5,000 default charge. Recovery for the affected hand is ₦10,000."
            />

            <div className="mt-6 rounded-2xl bg-[#E5FFF7] p-4">
              <p className="text-sm font-bold text-[#00674F]">
                Completion
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3F4944]">
                Your Pinnacle package is completed when all hands finish the
                12-week period. A ₦2,000 package clearance fee applies at
                completion.
              </p>
            </div>
          </ProgramCard>

          {/* CHOP BETA */}
          <ProgramCard
            accent="pink"
            name="CHOP BETA"
            label="5-Month Foodstuff Savings Program"
            duration="5 Months"
            stats={[
              ["Registration", "No Fee"],
              ["Per Hand", "₦30,000 / month"],
              ["Total / Hand", "₦150,000"],
            ]}
          >
            <ProgramFeature
              icon={Users}
              title="Choose Your Hands"
              text="You can choose multiple hands under one Chop Beta package. All hands start together and follow the same 5-month period."
            />

            <ProgramFeature
              icon={Wallet}
              title="Monthly Payments"
              text="₦30,000 is taken each month for each active hand from your Elevate Wallet."
            />

            <ProgramFeature
              icon={HandHeart}
              title="Foodstuff Benefit"
              text="When the package is completed, the benefit is foodstuff rather than cash."
            />

            <ProgramFeature
              icon={ShieldCheck}
              title="Missed Payment"
              text="A missed monthly payment has a ₦2,000 default charge. Recovery for the affected hand is ₦32,000."
            />

            <div className="mt-6 rounded-2xl bg-[#FFF0F8] p-4">
              <p className="text-sm font-bold text-[#95064D]">
                Completion
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3F4944]">
                Your Chop Beta package is completed when all hands finish the
                5-month period. There is no clearance fee.
              </p>
            </div>
          </ProgramCard>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-full bg-[#00674F] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#004D3A]"
          >
            Choose A Program
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-y border-[#D9F4EB] bg-[#DEF9F1] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            centered
            eyebrow="Simple Steps"
            title="How Elevate Heart Works"
            description="Your journey is simple: join, choose your package and hands, fund your wallet, and keep up with your scheduled payments."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <StepCard
              number="01"
              icon={Users}
              title="Create Your Account"
              text="Create your Elevate Heart member account."
            />

            <StepCard
              number="02"
              icon={Sparkles}
              title="Choose A Program"
              text="Choose Pinnacle or Chop Beta and select your number of hands."
            />

            <StepCard
              number="03"
              icon={Banknote}
              title="Fund Your Wallet"
              text="Transfer money from your bank to the dedicated account provided for your Elevate Wallet."
            />

            <StepCard
              number="04"
              icon={Clock3}
              title="Make Your Payments"
              text="Pinnacle payments are weekly. Chop Beta payments are monthly."
            />

            <StepCard
              number="05"
              icon={Check}
              title="Complete Your Package"
              text="Finish the required period on every hand in your package and receive the applicable completion benefit."
            />
          </div>

          {/* Wallet flow */}
          <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-[#BEEFE0] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9F4EB] text-[#00674F]">
                <Wallet className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#00674F]">
                  Your money flow
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#3F4944]">
                  Fund your dedicated account by bank transfer. When the money
                  is received, it is added to your Elevate Wallet. Your
                  scheduled savings payments are then taken from the wallet.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
              <FlowBox text="Bank Transfer" />
              <ArrowRight className="hidden h-5 w-5 text-[#16BE97] sm:block" />
              <FlowBox text="Dedicated Account" />
              <ArrowRight className="hidden h-5 w-5 text-[#16BE97] sm:block" />
              <FlowBox text="Elevate Wallet" />
              <ArrowRight className="hidden h-5 w-5 text-[#16BE97] sm:block" />
              <FlowBox text="Savings Payment" />
            </div>
          </div>
        </div>
      </section>

      {/* EMPOWERMENT */}
      <section
        id="empowerment"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="Community Empowerment"
          title="More Than A Savings Program"
          description="Our work extends beyond member savings. We support people and communities through education, skills, mentorship, opportunities and practical support."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {empowermentCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="overflow-hidden rounded-3xl border border-[#D9F4EB] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden bg-[#D9F4EB]">
                  <Image
                    src={empowermentImages[index]}
                    alt={card.title}
                    className="h-full w-full object-cover"
                    fill
                  />

                  <span className="absolute bottom-3 left-3 rounded-full bg-[#00674F] px-3 py-1 text-xs font-bold text-white">
                    {card.label}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5FFF7] text-[#00674F]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[#071F1B]">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#6F7A74]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-[#D9F4EB] bg-[#DEF9F1] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            centered
            eyebrow="Questions & Answers"
            title="Frequently Asked Questions"
            description="Clear information about our programs, wallet and member journey."
          />

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-2xl border border-[#D9F4EB] bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-base font-bold text-[#071F1B]">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#00674F] transition-transform group-open:rotate-180" />
                </summary>

                <p className="pt-4 text-sm leading-7 text-[#6F7A74]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-[#F7FFF6] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            centered
            eyebrow="Get In Touch"
            title="We're Here To Help"
            description="Have questions about Elevate Heart, our programs or your member journey? Reach out to us."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-[#00674F] p-8 text-white sm:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#52F2CC]">
                Contact Us
              </span>

              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold">
                We'd Love To Hear From You
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-7 text-[#D9F4EB]">
                Contact the Elevate Heart team for questions about programs,
                wallet funding, member support or community initiatives.
              </p>

              <div className="mt-8 space-y-4">
                <ContactItem
                  icon={Mail}
                  label="Email"
                  value="hello@elevateheartfoundation.org"
                  href="mailto:hello@elevateheartfoundation.org"
                />

                <ContactItem
                  icon={Phone}
                  label="Phone"
                  value="+234 800 000 0000"
                  href="tel:+2348000000000"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-[#D9F4EB] bg-white p-8 shadow-sm sm:p-10">
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full Name" placeholder="Your full name" />
                  <Input label="Email Address" placeholder="you@example.com" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Phone Number" placeholder="+234 ..." />

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#3F4944]">
                      Inquiry Type
                    </label>

                    <select className="w-full rounded-xl border border-[#D9F4EB] bg-[#F7FFF6] px-4 py-3 text-sm text-[#071F1B] outline-none transition focus:border-[#16BE97]">
                      <option>Pinnacle Program</option>
                      <option>Chop Beta Program</option>
                      <option>Wallet Assistance</option>
                      <option>Community Opportunities</option>
                      <option>General Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#3F4944]">
                    Your Message
                  </label>

                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-xl border border-[#D9F4EB] bg-[#F7FFF6] px-4 py-3 text-sm text-[#071F1B] outline-none transition placeholder:text-[#8A9691] focus:border-[#16BE97]"
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00674F] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#004D3A] sm:w-auto"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#00674F] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="rounded-full bg-[#004D3A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#52F2CC]">
            Elevating Minds • Empowering Lives
          </div>

          <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight sm:text-5xl">
            Ready to begin your Elevate journey?
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#D9F4EB]">
            Join a community built around opportunity, growth, support and
            purposeful savings.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-full bg-[#16BE97] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#52F2CC] hover:text-[#071F1B]"
            >
              Join Elevate Heart
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#programs"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Explore Programs
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-[#A0F3D4]">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Community-rooted programs
            </span>

            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Dedicated Elevate Wallet
            </span>

            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Member support
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#00382B] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative h-14 flex items-center justify-center w-42 mb-4 overflow-hidden rounded bg-white">
                <Image
                  src={footerLogoImage}
                  alt="Elevate Heart Foundation"
                  // sizes="240px"
                  width={150}
                />
              </div>
              <p>
                Elevating Minds. Empowering Lives.
              </p>

              <p className="mt-3 max-w-md text-sm leading-7 text-[#A0F3D4]">
                Empowering individuals and underserved communities through
                education, skills development, mentorship, opportunity and
                compassionate support.
              </p>
            </div>

            <FooterColumn
              title="Explore"
              links={[
                ["About", "#about"],
                ["How It Works", "#how-it-works"],
                ["Programs", "#programs"],
                ["Empowerment", "#empowerment"],
              ]}
            />

            <FooterColumn
              title="Support"
              links={[
                ["FAQs", "#faq"],
                ["Contact", "#contact"],
                ["Sign In", "/login"],
                ["Join Elevate", "/join"],
              ]}
            />

            <div className="lg:col-span-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#52F2CC]">
                Connect
              </p>

              <div className="mt-4 space-y-3 text-sm text-[#A0F3D4]">
                <a
                  href="mailto:hello@elevateheartfoundation.org"
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#52F2CC]" />
                  hello@elevateheartfoundation.org
                </a>

                <a
                  href="tel:+2348000000000"
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#52F2CC]" />
                  +234 800 000 0000
                </a>
              </div>

              <div className="mt-5 flex gap-2">
                <SocialButton icon={FaInstagram} label="FaInstagram" />
                <SocialButton icon={FaLinkedin} label="FaLinkedin" />
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-[#7DB7A8] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Elevate Heart Foundation. All rights reserved.</p>

            <div className="flex flex-wrap gap-5">
              <Link href="/privacy" className="hover:text-[#52F2CC]">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-[#52F2CC]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS */
/* -------------------------------------------------------------------------- */

function TrustItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9F4EB] text-[#00674F]">
        <Icon className="h-4 w-4" />
      </div>

      <span className="text-[11px] font-bold uppercase tracking-wide text-[#6F7A74]">
        {text}
      </span>
    </div>
  );
}

function PillarBadge({
  icon: Icon,
  label,
  className,
}: {
  icon: React.ElementType;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-1.5 rounded-full border border-[#D9F4EB] bg-white px-3 py-2 shadow-sm ${className}`}
    >
      <Icon className="h-3.5 w-3.5 text-[#16BE97]" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#071F1B]">
        {label}
      </span>
    </div>
  );
}

function PurposeCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#52F2CC]/15 text-[#52F2CC]">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-[#BEEFE0]">{text}</p>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  eyebrow,
  title,
  text,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-[#D9F4EB] bg-white p-8 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9F4EB] text-[#00674F]">
        <Icon className="h-6 w-6" />
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#16BE97]">
        {eyebrow}
      </p>

      <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[#00674F]">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-[#6F7A74]">{text}</p>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#D9F4EB] bg-white p-5 text-center">
      <Icon className="mx-auto h-7 w-7 text-[#00674F]" />

      <h4 className="mt-3 font-[family-name:var(--font-display)] text-sm font-bold">
        {title}
      </h4>

      <p className="mt-1 text-xs leading-6 text-[#6F7A74]">{text}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00674F]">
        {eyebrow}
      </span>

      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#004D3A] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-3 text-base leading-7 text-[#6F7A74]">
        {description}
      </p>
    </div>
  );
}

function ProgramCard({
  accent,
  name,
  label,
  duration,
  stats,
  children,
}: {
  accent: "teal" | "pink";
  name: string;
  label: string;
  duration: string;
  stats: [string, string][];
  children: React.ReactNode;
}) {
  const isPink = accent === "pink";

  return (
    <article className="relative flex flex-col overflow-hidden rounded-3xl border border-[#D9F4EB] bg-white p-7 shadow-sm sm:p-8">
      <div
        className={`absolute left-0 right-0 top-0 h-1.5 ${isPink ? "bg-[#E3238A]" : "bg-[#16BE97]"
          }`}
      />

      <div className="flex items-start justify-between gap-5 pt-2">
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-wider ${isPink ? "text-[#95064D]" : "text-[#00674F]"
              }`}
          >
            {label}
          </p>

          <h3
            className={`mt-1 font-[family-name:var(--font-display)] text-3xl font-bold ${isPink ? "text-[#95064D]" : "text-[#004D3A]"
              }`}
          >
            {name}
          </h3>
        </div>

        <div
          className={`shrink-0 rounded-2xl px-4 py-2 text-center ${isPink
            ? "bg-[#FFF0F8] text-[#95064D]"
            : "bg-[#E5FFF7] text-[#00674F]"
            }`}
        >
          <p className="text-lg font-bold">{duration.split(" ")[0]}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider">
            {duration.split(" ").slice(1).join(" ")}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 rounded-2xl bg-[#F7FFF6] p-4 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label}>
            <p className="text-[11px] font-semibold text-[#6F7A74]">{label}</p>
            <p className="mt-1 text-base font-bold text-[#071F1B]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 space-y-5">{children}</div>

      <div className="mt-8">
        <Link
          href="/join"
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white transition ${isPink
            ? "bg-[#95064D] hover:bg-[#5B002D]"
            : "bg-[#00674F] hover:bg-[#004D3A]"
            }`}
        >
          Join {name}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function ProgramFeature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5FFF7] text-[#00674F]">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <h4 className="text-sm font-bold text-[#071F1B]">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-[#6F7A74]">{text}</p>
      </div>
    </div>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  text,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#D9F4EB] bg-white p-5 shadow-sm">
      <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#BEEFE0]">
        {number}
      </span>

      <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5FFF7] text-[#00674F]">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-base font-bold text-[#071F1B]">{title}</h3>

      <p className="mt-2 text-xs leading-6 text-[#6F7A74]">{text}</p>
    </div>
  );
}

function FlowBox({ text }: { text: string }) {
  return (
    <div className="w-full rounded-xl border border-[#BEEFE0] bg-[#F7FFF6] px-4 py-3 text-center text-xs font-bold text-[#00674F] sm:w-auto">
      {text}
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#52F2CC]/15 text-[#52F2CC]">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#A0F3D4]">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
    </a>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#3F4944]">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#D9F4EB] bg-[#F7FFF6] px-4 py-3 text-sm text-[#071F1B] outline-none transition placeholder:text-[#8A9691] focus:border-[#16BE97]"
      />
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div className="lg:col-span-2">
      <p className="text-xs font-bold uppercase tracking-widest text-[#52F2CC]">
        {title}
      </p>

      <div className="mt-4 flex flex-col gap-3 text-sm text-[#A0F3D4]">
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            className="transition hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#52F2CC] hover:text-[#00382B]"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}