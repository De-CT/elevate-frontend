import { HelpCircle, RotateCcw } from "lucide-react";
import FAQItem from "./FAQItem";
import { FAQ, SupportCategoryId } from "./support-types";

type Props = {
  faqs: FAQ[];
  activeCategory: SupportCategoryId | "all";
  onClear: () => void;
};

export default function FAQSection({
  faqs,
  activeCategory,
  onClear,
}: Props) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle size={21} className="text-primary" />
            <h2 className="font-headline text-xl font-bold text-on-surface">
              Common Questions
            </h2>
          </div>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Tap a question to see the answer.
          </p>
        </div>

        {activeCategory !== "all" && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 self-start font-label-md text-sm font-semibold text-primary hover:underline sm:self-auto"
          >
            <RotateCcw size={15} />
            Show all questions
          </button>
        )}
      </div>

      {faqs.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest px-5 py-10 text-center">
          <p className="font-headline font-semibold text-on-surface">
            No matching questions found
          </p>
          <p className="mt-1 font-body text-sm text-on-surface-variant">
            Try another word or contact our support team.
          </p>
          <button
            type="button"
            onClick={onClear}
            className="mt-4 rounded-full bg-surface-container-low px-5 py-2.5 font-label-md text-sm font-semibold text-primary"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}