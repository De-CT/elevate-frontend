"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ActivationStep } from "./ActivationStep";
import { ChooseProgramStep, type ProgramSelection } from "./ChooseProgramStep";
import { StepIndicator } from "./StepIndicator";
import { AuthHeader } from "./AuthHeader";
import { useAppStore } from "@/store/useAppStore";
import { useUserStore } from "@/store/useUserStore";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { listPackages } from "@/backend/user";
import { CustomButton } from "@/components/CustomButton";

export function RegistrationCompletionFlow() {
    const [selection, setSelection] = useState<ProgramSelection | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [packagesError, setPackagesError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const setRegistrationDraft = useAppStore((state) => state.setRegistrationDraft);
    const setActivePackages = useAppStore((state) => state.setActivePackages);

    useEffect(() => {

        const restoreSelection = async () => {
            setIsReady(false);
            setPackagesError(null);
            await useAppStore.persist.rehydrate();

            const savedDraft = useAppStore.getState().registrationDraft;
            const packages = await listPackages();
            setActivePackages(packages);

            if (savedDraft && savedDraft.userId === user?.id) {
                setSelection(savedDraft.selection);
            } else if (savedDraft) {
                setRegistrationDraft(null);
            }
            setIsReady(true);
        };

        restoreSelection().catch((error: unknown) => {

            setPackagesError(error instanceof Error ? error.message : "Unable to load program details.");
            setIsReady(true);
        });

    }, [retryCount, setActivePackages, setRegistrationDraft, user?.id]);

    const handleProgramSelect = (choice: ProgramSelection) => {
        if (user) setRegistrationDraft({ selection: choice, userId: user.id });
        setSelection(choice);
    };

    const handleBackToPrograms = () => {
        setRegistrationDraft(null);
        setSelection(null);
    };

    const handleFinish = () => {
        setRegistrationDraft(null);
        router.push("/dashboard");
    };

    if (!isReady) {
        return <FullScreenLoader label="Restoring your registration..." />;
    }

    if (packagesError) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
                <p role="alert" className="font-body text-on-surface-variant">{packagesError}</p>
                <CustomButton text="Try again" onClick={() => setRetryCount((count) => count + 1)} />
            </main>
        );
    }

    return (
        <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col justify-between">
            <AuthHeader />
            <main className="flex-1 w-full py-8 md:py-12 px-4 sm:px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <StepIndicator currentStep={selection ? 3 : 2} />
                    {selection ? (
                        <ActivationStep
                            accountName={user?.firstName ?? ""}
                            selection={selection}
                            onBack={handleBackToPrograms}
                            onFinish={handleFinish}
                        />
                    ) : (
                        <ChooseProgramStep onSelect={handleProgramSelect} loading={false} />
                    )}
                </div>
            </main>
        </div>
    );
}
