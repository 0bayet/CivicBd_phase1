import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, ThumbsUp, Check } from "lucide-react";
import { DEMO_ISSUES, getIssueById } from "@/data/demoIssues";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/format";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import CategoryBadge from "@/components/ui/CategoryBadge";
import IssueThumb from "@/components/issues/IssueThumb";
import IssueActions from "@/components/issues/IssueActions";
import RelatedIssues from "@/components/issues/RelatedIssues";

export const dynamicParams = false;

export function generateStaticParams() {
  return DEMO_ISSUES.map((issue) => ({ id: issue.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const issue = getIssueById(id);
  return { title: issue ? issue.title : "Report not found" };
}

const TIMELINE = [
  { id: "pending", label: "Reported", note: "Waiting for review" },
  { id: "verified", label: "Verified", note: "Confirmed by residents" },
  { id: "in_progress", label: "In progress", note: "Work has started" },
  { id: "resolved", label: "Resolved", note: "Marked as fixed" },
];

export default async function IssueDetailPage({ params }) {
  const { id } = await params;
  const issue = getIssueById(id);
  if (!issue) notFound();

  const category = getCategory(issue.category);
  const reachedIndex = TIMELINE.findIndex((step) => step.id === issue.status);

  return (
    <div className="container page-body">
      <Link href="/issues" className="back-link">
        <ArrowLeft size={18} aria-hidden="true" />
        All reports
      </Link>

      <div className="detail">
        <article className="detail__main">
          <div className="issue-card__meta">
            <StatusBadge status={issue.status} />
            <CategoryBadge category={issue.category} />
            <span className="detail__ref">{issue.id}</span>
          </div>
          <h1 className="detail__title">{issue.title}</h1>

          <IssueThumb category={issue.category} tall />

          <h2 className="detail__heading">What was reported</h2>
          <p className="detail__text">{issue.description}</p>

          <dl className="facts">
            <div>
              <dt>
                <MapPin size={16} aria-hidden="true" /> Location
              </dt>
              <dd>{issue.location}</dd>
            </div>
            <div>
              <dt>
                <Calendar size={16} aria-hidden="true" /> Reported on
              </dt>
              <dd>{formatDate(issue.date)}</dd>
            </div>
            <div>
              <dt>
                <ThumbsUp size={16} aria-hidden="true" /> Supporters
              </dt>
              <dd>{issue.supporters}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{category.label}</dd>
            </div>
          </dl>
        </article>

        <aside className="detail__side">
          <section className="card card--padded" aria-labelledby="progress-title">
            <h2 className="card__title" id="progress-title">
              Progress
            </h2>
            <ol className="timeline">
              {TIMELINE.map((step, index) => {
                const reached = index <= reachedIndex;
                return (
                  <li
                    key={step.id}
                    className={reached ? "timeline__step is-reached" : "timeline__step"}
                    aria-current={index === reachedIndex ? "step" : undefined}
                  >
                    <span className="timeline__dot" aria-hidden="true">
                      {reached && <Check size={14} />}
                    </span>
                    <span>
                      <span className="timeline__label">{step.label}</span>
                      <span className="timeline__note">{step.note}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>

          <IssueActions supporters={issue.supporters} />

          <Button href="/report" block>
            Report a similar issue
          </Button>
        </aside>
      </div>

      <RelatedIssues current={issue} />
    </div>
  );
}
