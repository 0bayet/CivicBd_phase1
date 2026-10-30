"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { validateLogin } from "@/lib/validators";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  function setField(name, value) {
    const next = { ...values, [name]: value };
    setValues(next);
    setChecked(false);
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateLogin(next)[name] }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validateLogin(values);
    setErrors(found);
    const first = ["email", "password"].find((name) => found[name]);
    if (first) {
      setChecked(false);
      document.getElementById(`login-${first}`)?.focus();
      return;
    }
    setChecked(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-grid auth__form">
      <FormField id="login-email" label="Email address" required error={errors.email}>
        {(props) => (
          <input
            {...props}
            className="input"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
          />
        )}
      </FormField>

      <FormField id="login-password" label="Password" required error={errors.password}>
        {(props) => (
          <PasswordField
            {...props}
            autoComplete="current-password"
            value={values.password}
            onChange={(event) => setField("password", event.target.value)}
          />
        )}
      </FormField>

      {checked && (
        <Alert variant="success" role="status" title="Details look valid">
          Sign-in is not available yet, so no session was started.
        </Alert>
      )}

      <Button type="submit" size="lg" block icon={LogIn}>
        Log in
      </Button>

      <p className="auth__switch">
        New here? <Link href="/register">Create an account</Link>
      </p>
    </form>
  );
}
