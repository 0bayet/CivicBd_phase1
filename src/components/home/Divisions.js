import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DIVISIONS } from "@/data/divisions";
import { DEMO_ISSUES } from "@/data/demoIssues";

export default function Divisions() {
  return (
    <section className="section" aria-labelledby="divisions-title">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 id="divisions-title">Find reports in your division</h2>
            <p>Open the directory already searched for the division you live in.</p>
          </div>
        </div>

        <ul className="division-grid">
          {DIVISIONS.map(({ id, name, query }) => {
            const count = DEMO_ISSUES.filter((issue) => issue.location.includes(name)).length;
            return (
              <li key={id}>
                <Link href={`/issues?q=${encodeURIComponent(query)}`} className="division-card">
                  <span className="division-card__name">{name}</span>
                  <span className="division-card__count">
                    {count === 0 ? "No reports yet" : `${count} ${count === 1 ? "report" : "reports"}`}
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" className="division-card__icon" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
