"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { restoreAuthenticatedProfile } from "../../utils/session";
import { useAppStore } from "@/store/useAppStore";
import { FullScreenLoader } from "@/components/FullScreenLoader";

interface AuthGuardProps {
    children: ReactNode;
    mode?: "member" | "completion";
}

export default function AuthGuard({ children, mode = "member" }: AuthGuardProps) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        const checkAccess = async () => {
            await useAppStore.persist.rehydrate();
            const profile = await restoreAuthenticatedProfile();
            console.log(profile)
            if (!profile) {
                router.replace("/login");
            } else if (profile.kycStatus === "VERIFIED" && mode === "completion") {
                router.replace("/dashboard");
            } else if (profile.kycStatus !== "VERIFIED" && mode === "member") {
                router.replace("/complete-registration");
            } else {
                setChecked(true);
            }
        };

        checkAccess();
    }, [mode, router]);

    if (!checked) return <FullScreenLoader label="Checking your account..." />;
    return <>{children}</>;
}
