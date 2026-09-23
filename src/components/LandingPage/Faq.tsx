import { ChevronDown } from "lucide-react";


const FAQS = [
    {
        question: "What is Elevate Heart Foundation?",
        answer:
            "Elevate Heart Foundation is a community welfare and empowerment organization. We provide structured member contribution programs, youth mentorship, skills development, women's support, and foodstuff security initiatives. We are strictly a non-profit foundation and do not engage in investment trading, wealth speculation, or commercial banking.",
    },
    {
        question: "What is Pinnacle?",
        answer:
            "Pinnacle is a 12-week structured member contribution sprint. Participants register with a one-time ₦3,000 fee and contribute ₦5,000 weekly (totaling ₦60,000). At maturity, members access their financial payout upon the standard clearance fee, plus an optional ₦20,000 incentive if an eligible member referral was completed.",
    },
    {
        question: "What is Chop Beta?",
        answer:
            "Chop Beta is a 5-month household food security program where members contribute ₦30,000 monthly per hand over 5 months (total ₦150,000 per hand) to receive high-grade food provisions upon completion. With zero registration fees, members receive a full foodstuff bundle of staples (rice, beans, cooking oil, seasonings) upon maturity, distributed at designated regional collection depots.",
    },
    {
        question: "What is the Elevate Wallet?",
        answer:
            "The Elevate Wallet is your central funding hub on the platform. It comes with a dedicated Nigerian virtual account number. You fund this wallet via standard bank transfer, and weekly contributions are deducted from it automatically or manually to fund your active savings sub-accounts.",
    },
    {
        question: "Can I have multiple savings accounts?",
        answer:
            "Yes. A single member can open and manage multiple individual savings accounts (e.g., two Pinnacle slots and one Chop Beta slot) under their single, central Elevate Wallet. Each account tracks its own timeline and weekly payment schedule independently.",
    },
    {
        question: "When does my Pinnacle referral become active?",
        answer:
            "Your unique referral invitation code for each Pinnacle savings account unlocks automatically after Week 4 of consistent on-time contributions. A single qualified invite completed after this period earns you the ₦20,000 referral incentive at maturity.",
    },
    {
        question: "What happens if I miss a weekly contribution?",
        answer:
            "A default fee applies to missed contributions to maintain community discipline and accountability — full terms and resolution timelines are confirmed at signup.",
    },
    {
        question: "Can I withdraw before maturity?",
        answer:
            "No. Contributions locked in active Pinnacle or Chop Beta savings accounts are strictly non-withdrawable prior to program maturity. This rule maintains mutual trust and safeguards the collective integrity of each savings cohort. Any unused balance in your main Elevate Wallet, however, remains fully accessible.",
    },
    {
        question: "What happens at maturity?",
        answer:
            "Upon reaching the final week (Week 12 for Pinnacle or Week 25 for Chop Beta), your journey status updates to Completed. For Pinnacle, your savings balance (and any earned referral incentive, minus the clearance fee) is transferred directly to your verified commercial bank account. For Chop Beta, you receive a digital collection voucher to pick up your packaged foodstuff bundles at your local distribution center.",
    },
    {
        question: "What is the clearance fee?",
        answer:
            "The administrative clearance covers final verification, record processing, and distribution logistics upon program maturity.",
    },
];

export function FAQ() {
    return (
        <section id="faq" className="w-full bg-surface-container-low py-20 px-4 md:px-8 border-t border-surface-container">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">
                <div className="text-center">
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                        Community Foundation • Structured Contribution Journeys
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight mt-1">
                        Frequently Asked Questions
                    </h2>
                    <p className="font-sans text-base text-on-surface-variant mt-1 leading-7">
                        Clear answers about Elevate Heart Foundation, our contribution journeys,
                        and program guidelines.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {FAQS.map((faq, index) => (
                        <details
                            key={faq.question}
                            className="group bg-surface-container-lowest rounded-2xl p-6 border border-surface-container transition-all [&_summary::-webkit-details-marker]:hidden"
                            open={index === 0}
                        >
                            <summary className="flex items-center justify-between cursor-pointer list-none font-display text-base font-bold text-on-surface">
                                {faq.question}
                                <ChevronDown className="w-5 h-5 text-primary group-open:rotate-180 transition-transform shrink-0" />
                            </summary>
                            <p className="font-sans text-sm text-on-surface-variant pt-3 leading-7">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}