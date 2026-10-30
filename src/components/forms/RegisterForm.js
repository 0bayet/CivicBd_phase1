"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, Check, Circle } from "lucide-react";
import { checkPassword, validateRegister } from "@/lib/validators";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import PasswordField from "./PasswordField";

const INITIAL = { name: "", email: "", password: "", confirmPassword: "", agree: false };
const ORDER = ["name", "email", "password", "confirmPassword", "agree"];

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters" },
  { key: "letter", label: "Contains a letter" },
  { key: "number", label: "Contains a number" },
];

export default function RegisterForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  const passwordChecks = checkPassword(values.password);

  function setField(name, value) {
    const next = { ...values, [name]: value };
    setValues(next);
    setChecked(false);
    if (errors[name] || (name === "password" && errors.confirmPassword)) {
      const found = validateRegister(next);
      setErrors((current) => ({
        ...current,
        [name]: found[name],
        ...(name === "password" && current.confirmPassword ? { confirmPassword: found.confirmPassword } : {}),
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validateRegister(values);
    setErrors(found);
    const first = ORDER.find((name) => found[name]);
    if (first) {
      setChecked(false);
      document.getElementById(`register-${first}`)?.focus();
      return;
    }
    setChecked(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-grid auth__form">
      <FormField id="register-name" label="Full name" required error={errors.name}>
        {(props) => (
          <input
            {...props}
            className="input"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
          />
        )}
      </FormField>

      <FormField id="register-email" label="Email address" required error={errors.email}>
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

      <FormField id="register-password" label="Password" required error={errors.password}>
        {(props) => (
          <PasswordField
            {...props}
            autoComplete="new-password"
            value={values.password}
            onChange={(event) => setField("password", event.target.value)}
          />
        )}
      </FormField>

      <ul className="password-rules" aria-label="Password requirements">
        {PASSWORD_RULES.map((rule) => {
          const met = passwordChecks[rule.key];
          const Icon = met ? Check : Circle;
          return (
            <li key={rule.key} className={met ? "password-rules__item is-met" : "password-rules__item"}>
              <Icon size={14} aria-hidden="true" />
              {rule.label}
              <span className="visually-hidden">{met ? " (met)" : " (not met yet)"}</span>
            </li>
          );
        })}
      </ul>

      <FormField id="register-confirmPassword" label="Confirm password" required error={errors.confirmPassword}>
        {(props) => (
          <PasswordField
            {...props}
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={(event) => setField("confirmPassword", event.target.value)}
          />
        )}
      </FormField>

      <div>
        <label className="checkbox" htmlFor="register-agree">
          <input
            id="register-agree"
            type="checkbox"
            checked={values.agree}
            aria-invalid={errors.agree ? "true" : undefined}
            aria-describedby={errors.agree ? "register-agree-error" : undefined}
            onChange={(event) => setField("agree", event.target.checked)}
          />
          <span>
            I have read the <Link href="/privacy">privacy policy</Link>.
          </span>
        </label>
        {errors.agree && (
          <p className="field__error" id="register-agree-error">
            {errors.agree}
          </p>
        )}
      </div>

      {checked && (
        <Alert variant="success" role="status" title="Details look valid">
          Registration is not available yet, so no account was created.
        </Alert>
      )}

      <Button type="submit" size="lg" block icon={UserPlus}>
        Create account
      </Button>

      <p className="auth__switch">
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
}
