import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function MemberLayout({ children }: { children: ReactNode }) {
  return <AuthGuard mode="member">{children}</AuthGuard>;
}