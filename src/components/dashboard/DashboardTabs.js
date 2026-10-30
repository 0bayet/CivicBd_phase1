import Link from "next/link";

const TABS = [
  { href: "/dashboard", label: "Resident view" },
  { href: "/admin", label: "Admin view" },
];

export default function DashboardTabs({ current }) {
  return (
    <nav className="tabs" aria-label="Dashboard views">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="tabs__link"
          aria-current={tab.href === current ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
