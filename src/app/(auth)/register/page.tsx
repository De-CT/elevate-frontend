import RegisterFlow from "@/components/auth/RegisterFlow";
import RedirectIfAuthed from "@/components/auth/RedirectIfAuthed";

export default function RegisterPage() {
  return (
    <RedirectIfAuthed>
      <RegisterFlow />
    </RedirectIfAuthed>
  );
}