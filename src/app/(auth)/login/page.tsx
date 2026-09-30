import LoginFlow from "@/components/auth/LoginFlow";
import RedirectIfAuthed from "@/components/auth/RedirectIfAuthed";

export default function LoginPage() {
  return (
    <RedirectIfAuthed>
      <LoginFlow />
    </RedirectIfAuthed>
  );
}