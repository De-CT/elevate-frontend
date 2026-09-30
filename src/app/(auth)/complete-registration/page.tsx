import { RegistrationCompletionFlow } from "../../../components/auth/RegistrationCompletionFlow";
import AuthGuard from "@/components/auth/AuthGuard";

export default function CompleteRegistrationPage() {
  return (
    <AuthGuard mode="completion">
      <RegistrationCompletionFlow />
    </AuthGuard>
  );
}
