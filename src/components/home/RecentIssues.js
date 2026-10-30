import { DEMO_ISSUES } from "@/data/demoIssues";
import Button from "../ui/Button";
import IssueCard from "../issues/IssueCard";
import { ArrowRight } from "lucide-react";

export default function RecentIssues() {
  const recent = [...DEMO_ISSUES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section className="section section--surface" aria-labelledby="recent-title">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Latest from the community</p>
            <h2 id="recent-title">Recent reports</h2>
            <p>The latest problems residents have reported.</p>
          </div>
          <Button href="/issues" variant="secondary" iconAfter={ArrowRight}>
            Explore all issues
          </Button>
        </div>

        <div className="issue-grid">
          {recent.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </section>
  );
}
