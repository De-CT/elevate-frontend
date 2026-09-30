"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthSessionListener() {
  const router = useRouter();

  useEffect(() => {
    const handleSessionExpired = () => router.replace("/login");
    window.addEventListener("ehf:session-expired", handleSessionExpired);
    return () => window.removeEventListener("ehf:session-expired", handleSessionExpired);
  }, [router]);

  return null;
}
