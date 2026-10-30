import { FileText, Clock, Wrench, CircleCheck, Plus, Search } from "lucide-react";
import { DEMO_ISSUES, getDemoStats } from "@/data/demoIssues";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import ReportsTable from "@/components/dashboard/ReportsTable";

export const metadata = { title: "My dashboard" };

// Reports shown as the signed-in resident's own.
const SAMPLE_IDS = ["CIR-2035", "CIR-2002", "CIR-2038", "CIR-2006", "CIR-2017"];

export default function DashboardPage() {
  const myReports = DEMO_ISSUES.filter((issue) => SAMPLE_IDS.includes(issue.id));
  const stats = getDemoStats(myReports);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="My reports"
        description="Your reports and where they stand."
      >
        <DashboardTabs current="/dashboard" />
      </PageHeader>

      <div className="container page-body dashboard">
        <div className="stat-grid">
          <StatCard label="Reports made" value={stats.total} icon={FileText} />
          <StatCard label="Pending review" value={stats.pending} icon={Clock} />
          <StatCard label="In progress" value={stats.inProgress} icon={Wrench} />
          <StatCard label="Resolved" value={stats.resolved} icon={CircleCheck} />
        </div>

        <div className="dashboard__grid">
          <ReportsTable caption="Recent reports" issues={myReports} />

          <aside className="card card--padded dashboard__aside" aria-labelledby="actions-title">
            <h2 className="aside-title" id="actions-title">
              Quick actions
            </h2>
            <p className="aside-text">Start a new report or look at what others in your area have raised.</p>
            <Button href="/report" icon={Plus} block>
              Report an issue
            </Button>
            <Button href="/issues" variant="secondary" icon={Search} block>
              Explore issues
            </Button>
          </aside>
        </div>
      </div>
    </>
  );
}
