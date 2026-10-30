import { DEMO_ISSUES } from "@/data/demoIssues";
import { getCategory } from "@/data/categories";
import IssueCard from "./IssueCard";

export default function RelatedIssues({ current }) {
  const related = DEMO_ISSUES.filter((issue) => issue.category === current.category && issue.id !== current.id).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">More reports about {getCategory(current.category).label.toLowerCase()}</h2>
      <div className="issue-grid">
        {related.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}
