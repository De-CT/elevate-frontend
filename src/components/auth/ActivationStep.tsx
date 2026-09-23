"use client";

import { useState } from "react";
import { ArrowRight, Building2, Check, CheckCircle2, ClipboardCopy } from "lucide-react";
import { CustomButton } from "@/components/CustomButton";
import type { ProgramSelection } from "./ChooseProgramStep";

const PINNACLE_REG_FEE = 3000;
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

type BankDetails = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export function ActivationStep({
  accountName,
  selection,
  bank,
  batchCode = "#BAT-PIN-01",
  onBack,
  onFinish,
}: {
  accountName: string;
  selection: ProgramSelection;
  /** Dedicated virtual account for this member — comes from the backend once the
   * account is provisioned. Falls back to a placeholder while wiring that up. */
  bank?: BankDetails;
  batchCode?: string;
  onBack: () => void;
  onFinish: () => void;
}) {
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const resolvedBank: BankDetails = bank ?? {
    bankName: "Providus Bank",
    accountName: `Elevate Heart / ${accountName}`,
    accountNumber: "9901847291",
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolvedBank.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the number is still visible to copy manually.
    }
  };

  const handleFinish = () => {
    setSuccess(true);
    onFinish();
  };

  if (success) {
    return (
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl border border-surface-container p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-headline font-bold text-3xl text-primary mb-2">Welcome Aboard!</h2>
        <p className="font-body text-base text-on-surface-variant max-w-md mx-auto mb-8">
          Your Elevate Heart savings account is set up. An SMS confirmation has been sent to your
          phone.
        </p>
        <CustomButton
          text="Enter Member Dashboard"
          fullWidth
          onClick={() => window.location.reload()}
        />
      </div>
    );
  }

  if (selection.program === "chop-beta") {
    return (
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl border-2 border-surface-container shadow-sm p-6 sm:p-10">
        <div className="mb-6 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
            <Check className="w-6 h-6" />
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary">
            Chop Beta is Ready!
          </h2>
          <p className="font-body text-base text-on-surface-variant mt-2 leading-relaxed">
            No registration fee needed to start Chop Beta. You can make your first weekly
            contribution from your wallet.
          </p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-5 mb-8 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface-variant text-sm">Selected Program:</span>
            <span className="font-headline font-bold text-primary text-base">
              Chop Beta Foodstuff
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-body text-on-surface-variant text-sm">Setup Fee:</span>
            <span className="font-headline font-bold text-secondary-accent text-lg">₦0 FREE</span>
          </div>
        </div>

        <div className="space-y-3">
          <CustomButton
            text="Go to Dashboard"
            fullWidth
            rightIcon={<ArrowRight className="w-5 h-5" />}
            onClick={handleFinish}
          />
          <CustomButton text="Change Program" variant="ghost" size="md" fullWidth onClick={onBack} />
        </div>
      </div>
    );
  }

  const totalFee = selection.quantity * PINNACLE_REG_FEE;

  return (
    <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl border-2 border-surface-container shadow-sm p-6 sm:p-10">
      <div className="mb-6">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary">
          Pinnacle Registration
        </h2>
        <p className="font-body text-base text-on-surface-variant mt-2">
          To start your Pinnacle plan, pay the one-time registration fee of {naira(totalFee)}.
        </p>
      </div>

      <div className="bg-surface-container-low rounded-xl p-4 sm:p-5 mb-6 space-y-2.5">
        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="font-body text-on-surface-variant">Selected Batch:</span>
          <span className="font-headline font-bold text-primary">
            Pinnacle ({selection.quantity} Accounts • {batchCode})
          </span>
        </div>
        <div className="flex justify-between items-center text-sm sm:text-base">
          <span className="font-body text-on-surface-variant">Fee calculation:</span>
          <span className="font-body font-medium text-on-surface">
            {selection.quantity} accounts × {naira(PINNACLE_REG_FEE)}
          </span>
        </div>
        <div className="h-px bg-surface-container" />
        <div className="flex justify-between items-center pt-1">
          <span className="font-headline font-bold text-base text-on-surface">
            Total registration fee:
          </span>
          <span className="font-headline font-bold text-2xl text-primary">{naira(totalFee)}</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest border-2 border-primary-container rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
        <div className="flex items-center gap-2 text-primary font-headline font-bold text-sm uppercase tracking-wide">
          <Building2 className="w-[18px] h-[18px]" />
          <span>Bank Transfer</span>
        </div>
        <div className="space-y-3">
          <div>
            <span className="font-body text-xs text-on-surface-variant uppercase">Bank Name</span>
            <p className="font-headline font-bold text-base text-on-surface">
              {resolvedBank.bankName}
            </p>
          </div>
          <div>
            <span className="font-body text-xs text-on-surface-variant uppercase">
              Account Name
            </span>
            <p className="font-headline font-bold text-base text-on-surface">
              {resolvedBank.accountName}
            </p>
          </div>
          <div>
            <span className="font-body text-xs text-on-surface-variant uppercase">
              Account Number
            </span>
            <div className="flex items-center justify-between gap-3 mt-1 bg-surface-container-low p-3 rounded-xl">
              <span className="font-headline font-bold text-2xl sm:text-3xl text-primary tracking-widest font-mono">
                {resolvedBank.accountNumber}
              </span>
              <CustomButton
                text={copied ? "Copied!" : "Copy"}
                size="md"
                leftIcon={<ClipboardCopy className="w-[18px] h-[18px]" />}
                onClick={handleCopy}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <CustomButton
          text={`I have sent ${naira(totalFee)}`}
          fullWidth
          onClick={handleFinish}
        />
        <CustomButton text="Change Program" variant="ghost" size="md" fullWidth onClick={onBack} />
      </div>
    </div>
  );
}