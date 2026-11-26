import RegisterFlow from "@/components/auth/RegisterFlow";
import RedirectIfAuthed from "@/components/auth/RedirectIfAuthed";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <RedirectIfAuthed>
      <Suspense fallback={<FullScreenLoader label="Loading registration..." />}>
        <RegisterFlow />
      </Suspense>
    </RedirectIfAuthed>
  );
}