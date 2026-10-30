import { ShieldCheck, ListChecks, Bell } from "lucide-react";

const POINTS = [
  { icon: ListChecks, text: "Follow each report from pending review to resolved." },
  { icon: ShieldCheck, text: "Confirm problems other residents have found." },
  { icon: Bell, text: "Get updates when a report you care about changes." },
];

/** Two-column frame shared by the login and registration pages. */
export default function AuthShell({ title, description, children }) {
  return (
    <div className="container auth">
      <aside className="auth__aside" aria-label="About accounts">
        <h2>Your neighbourhood, on record</h2>
        <p>Accounts let you report problems, support other reports and follow what happens next.</p>
        <ul className="auth__points">
          {POINTS.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Icon size={20} aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </aside>

      <section className="card card--padded auth__panel">
        <h1 className="auth__title">{title}</h1>
        <p className="card__subtitle">{description}</p>
        {children}
      </section>
    </div>
  );
}
