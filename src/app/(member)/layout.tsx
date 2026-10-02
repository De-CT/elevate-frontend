import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { MemberShell } from "@/components/member/MemberShell";

export default function MemberLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard mode="member">
            <MemberShell>{children}</MemberShell>
        </AuthGuard>
    );
}