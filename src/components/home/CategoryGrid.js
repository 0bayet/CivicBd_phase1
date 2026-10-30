import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { DEMO_ISSUES } from "@/data/demoIssues";

export default function CategoryGrid() {
  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow">Categories</p>
            <h2 id="categories-title">What can you report?</h2>
            <p>Pick the category that matches what you saw. Each one opens the issue directory already filtered.</p>
          </div>
        </div>

        <ul className="category-grid">
          {CATEGORIES.map(({ id, label, description, icon: Icon }) => {
            const count = DEMO_ISSUES.filter((issue) => issue.category === id).length;
            return (
              <li key={id}>
                <Link href={`/issues?category=${id}`} className={`card category-card tone-${id}`}>
                  <span className="category-card__icon">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="category-card__title">
                    {label}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <span className="category-card__text">{description}</span>
                  <span className="category-card__count">
                    {count} {count === 1 ? "report" : "reports"}
                  </span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/issues" className="card category-card category-card--all">
              <span className="category-card__icon">
                <LayoutGrid size={24} aria-hidden="true" />
              </span>
              <span className="category-card__title">
                Browse everything
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
              <span className="category-card__text">Every report, with search, filters and sorting.</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
