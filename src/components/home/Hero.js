import { MapPin, Calendar, ThumbsUp } from "lucide-react";
import { DEMO_ISSUES, getDemoStats } from "@/data/demoIssues";
import { CATEGORIES } from "@/data/categories";
import { formatDate } from "@/lib/format";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";
import CategoryBadge from "../ui/CategoryBadge";
import IssueThumb from "../issues/IssueThumb";

export default function Hero() {
  const stats = getDemoStats();
  const featured = DEMO_ISSUES.find((issue) => issue.id === "CIR-2002");

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__tag">
            <MapPin size={16} aria-hidden="true" />
            See It. Report It. Solve It.
          </p>
          <h1 className="hero__title">Spot a problem in your neighbourhood? Report it.</h1>
          <p className="hero__bn" lang="bn">
            আপনার এলাকার সমস্যা জানান, একসাথে সমাধানের পথে এগোই।
          </p>
          <p className="hero__lead">
            CivicBD gives residents one shared place to document potholes, waste, waterlogging, broken
            streetlights and water supply problems, and to follow what happens next.
          </p>

          <div className="hero__actions">
            <Button href="/report" size="lg">
              Report an issue
            </Button>
            <Button href="/issues" size="lg" variant="secondary">
              Browse issues
            </Button>
          </div>

          <dl className="hero__stats">
            <div>
              <dt>Reports</dt>
              <dd>{stats.total}</dd>
            </div>
            <div>
              <dt>Categories</dt>
              <dd>{CATEGORIES.length}</dd>
            </div>
            <div>
              <dt>Supporters</dt>
              <dd>{stats.supporters}</dd>
            </div>
          </dl>
        </div>

        <article className="card preview-card" aria-label="Featured report">
          <div className="preview-card__head">
            <span>Featured report</span>
            <span className="preview-card__sample">In progress</span>
          </div>
          <IssueThumb category={featured.category} tall />
          <div className="preview-card__body">
            <div className="issue-card__meta">
              <StatusBadge status={featured.status} />
              <CategoryBadge category={featured.category} />
            </div>
            <h2 className="preview-card__title">{featured.title}</h2>
            <p className="preview-card__place">
              <MapPin size={16} aria-hidden="true" />
              {featured.location}
            </p>
            <div className="preview-card__foot">
              <span>
                <ThumbsUp size={16} aria-hidden="true" />
                <strong>{featured.supporters}</strong> supporters
              </span>
              <span>
                <Calendar size={16} aria-hidden="true" />
                {formatDate(featured.date)}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
