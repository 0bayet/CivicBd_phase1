import { getDemoStats } from "@/data/demoIssues";

export default function StatsBand() {
  const stats = getDemoStats();
  const items = [
    { label: "Total reports", value: stats.total },
    { label: "Pending review", value: stats.pending },
    { label: "In progress", value: stats.inProgress },
    { label: "Resolved", value: stats.resolved },
  ];

  return (
    <section className="section" aria-labelledby="snapshot-title">
      <div className="container">
        <div className="stats-band">
          <div className="stats-band__copy">
            <p className="stats-band__eyebrow">Community snapshot</p>
            <h2 id="snapshot-title">What the community is tracking</h2>
            <p>
              A running count of reports by stage, from the moment they are filed to the day they are fixed.
            </p>
          </div>
          <dl className="stats-band__grid">
            {items.map((item) => (
              <div key={item.label} className="stats-band__item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
