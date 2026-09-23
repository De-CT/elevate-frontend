"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createAccount } from "@/backend/auth";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { StepIndicator } from "./StepIndicator";
import { CreateAccountStep, type AccountDetails } from "./CreateAccountStep";
import { ChooseProgramStep, type ProgramSelection } from "./ChooseProgramStep";
import { ActivationStep } from "./ActivationStep";
import { useRouter } from "next/navigation";


export default function RegisterFlow() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [account, setAccount] = useState<AccountDetails | null>(null);
    const [selection, setSelection] = useState<ProgramSelection | null>(null);
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleAccountSubmit = async (values: AccountDetails) => {
        try {
            setLoading(true)
            await createAccount({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.password,
            });
            toast.success("Account created successfully");
            setAccount(values);
            setStep(2);
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setLoading(false)
        }
    };

    const handleProgramSelect = (choice: ProgramSelection) => {
        setSelection(choice);
        setStep(3);
    };

    return (
        <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col justify-between">
            <AuthHeader />

            <main className="flex-1 w-full py-8 md:py-12 px-4 sm:px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <StepIndicator currentStep={step} />

                    {step === 1 && <CreateAccountStep onNext={handleAccountSubmit} loading={loading} />}

                    {step === 2 && (
                        <ChooseProgramStep onSelect={handleProgramSelect} onBack={() => setStep(1)} />
                    )}

                    {step === 3 && selection && (
                        <ActivationStep
                            accountName={account ? `${account.firstName} ${account.lastName}` : ""}
                            selection={selection}
                            onBack={() => setStep(2)}
                            onFinish={() => {
                                // Hook up wallet/member activation confirmation here.
                                router.push('/dashboard')
                            }}
                        />
                    )}
                </div>
            </main>

            {/* <AuthFooter /> */}
        </div>
    );
}