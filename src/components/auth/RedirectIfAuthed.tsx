"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { restoreAuthenticatedProfile } from "../../utils/session";
import { FullScreenLoader } from "@/components/FullScreenLoader";

export default function RedirectIfAuthed({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {

        const checkExistingAuth = async () => {
            const profile = await restoreAuthenticatedProfile();

            if (profile) {
                router.replace(profile.kycStatus === "VERIFIED" ? "/dashboard" : "/complete-registration");
            } else {
                setChecked(true);
            }
        };

        checkExistingAuth();
    }, [router]);

    if (!checked) return <FullScreenLoader label="Checking your account..." />;
    return <>{children}</>;
}
