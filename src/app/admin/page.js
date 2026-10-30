import { Inbox, ShieldCheck, Wrench, CircleCheck } from "lucide-react";
import { DEMO_ISSUES, getDemoStats } from "@/data/demoIssues";
import { CATEGORIES } from "@/data/categories";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ReportsTable from "@/components/dashboard/ReportsTable";

export const metadata = { title: "Admin dashboard" };

export default function AdminPage() {
  const stats = getDemoStats();
  const queue = DEMO_ISSUES.filter((issue) => issue.status === "pending" || issue.status === "verified").sort(
    (a, b) => b.supporters - a.supporters
  );
  const byCategory = CATEGORIES.map((category) => ({
    ...category,
    count: DEMO_ISSUES.filter((issue) => issue.category === category.id).length,
  }));
  const largest = Math.max(...byCategory.map((category) => category.count), 1);

  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Admin dashboard"
        description="Review incoming reports and track their progress."
      >
        <DashboardTabs current="/admin" />
      </PageHeader>

      <div className="container page-body dashboard">
        <div className="stat-grid">
          <StatCard label="Awaiting review" value={stats.pending} icon={Inbox} />
          <StatCard label="Verified" value={stats.verified} icon={ShieldCheck} />
          <StatCard label="In progress" value={stats.inProgress} icon={Wrench} />
          <StatCard label="Resolved" value={stats.resolved} icon={CircleCheck} />
        </div>

        <div className="dashboard__grid">
          <ReportsTable caption="Review queue" issues={queue} showLocation showSupporters />

          <section className="card card--padded dashboard__aside" aria-labelledby="by-category-title">
            <h2 className="aside-title" id="by-category-title">
              Reports by category
            </h2>
            <ul className="bar-list">
              {byCategory.map((category) => (
                <li key={category.id}>
                  <div className="bar-list__label">
                    <span>{category.shortLabel}</span>
                    <span>{category.count}</span>
                  </div>
                  <div className="bar-list__track" aria-hidden="true">
                    <div className="bar-list__fill" style={{ width: `${(category.count / largest) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
