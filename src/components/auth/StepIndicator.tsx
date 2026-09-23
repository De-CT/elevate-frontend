import { Check } from "lucide-react";

const STEPS = [
  { number: 1, label: "Create Account" },
  { number: 2, label: "Choose Program" },
  { number: 3, label: "Activation" },
] as const;

const PROGRESS_WIDTH: Record<number, string> = {
  1: "15%",
  2: "50%",
  3: "90%",
};

export function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8 md:mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-6 right-6 top-5 h-1 bg-surface-container rounded-full z-0" />
        <div
          className="absolute left-6 top-5 h-1 bg-secondary-accent transition-all duration-300 rounded-full z-0"
          style={{ width: PROGRESS_WIDTH[currentStep] }}
        />

        {STEPS.map((step) => {
          const isComplete = step.number < currentStep;
          const isActive = step.number === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-headline font-bold text-base transition-all ${
                  isComplete
                    ? "bg-secondary-accent text-on-primary shadow-sm"
                    : isActive
                      ? "bg-primary-container text-on-primary shadow-md ring-4 ring-primary-container/20"
                      : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {isComplete ? <Check className="w-[18px] h-[18px]" /> : step.number}
              </div>
              <span
                className={`mt-2 font-headline text-sm ${
                  isComplete || isActive
                    ? "font-bold text-primary"
                    : "font-medium text-on-surface-variant"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}