"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import Logo from "./Logo";
import Button from "../ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/issues", label: "Explore issues" },
  { href: "/report", label: "Report an issue" },
  { href: "/about", label: "About" },
];

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState(null);
  // The menu counts as open only on the page where it was opened,
  // so navigating to another page closes it automatically.
  const menuOpen = openPath === pathname;

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Logo />

        <nav className="nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav__link"
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Button href="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/register" variant="secondary" size="sm">
            Register
          </Button>
          <Button href="/report" size="sm" icon={Plus}>
            Report issue
          </Button>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setOpenPath(menuOpen ? null : pathname)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <nav className="container" aria-label="Mobile">
            <ul className="mobile-menu__list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="mobile-menu__link"
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-menu__actions">
              <Button href="/report" icon={Plus}>
                Report issue
              </Button>
              <Button href="/login" variant="secondary">
                Log in
              </Button>
              <Button href="/register" variant="secondary">
                Register
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
