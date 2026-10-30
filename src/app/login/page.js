import AuthShell from "@/components/forms/AuthShell";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" description="Log in to follow the reports you have made and supported.">
      <LoginForm />
    </AuthShell>
  );
}
