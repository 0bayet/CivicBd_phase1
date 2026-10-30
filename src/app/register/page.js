import AuthShell from "@/components/forms/AuthShell";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <AuthShell title="Create your account" description="Register to report problems and track them until they are fixed.">
      <RegisterForm />
    </AuthShell>
  );
}
