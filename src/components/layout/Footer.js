import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { href: "/", label: "Home" },
      { href: "/issues", label: "Explore issues" },
      { href: "/report", label: "Report an issue" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/register", label: "Register" },
      { href: "/dashboard", label: "My dashboard" },
      { href: "/admin", label: "Admin dashboard" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/about", label: "About the project" },
      { href: "/privacy", label: "Privacy policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Logo />
          <p className="site-footer__tagline">See It. Report It. Solve It.</p>
          <p>
            A community platform for reporting potholes, waste, drainage, streetlight and water supply problems, and
            following each report until it is resolved.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="site-footer__heading">{column.title}</h2>
            <ul className="site-footer__links">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container">
        <p className="site-footer__emergency">
          In an emergency, call <strong>999</strong>. This platform is for non-urgent community problems.
        </p>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          © {new Date().getFullYear()} CivicBD. An independent community platform, not affiliated with any
          government body.
        </div>
      </div>
    </footer>
  );
}
