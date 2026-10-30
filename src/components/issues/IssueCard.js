import Link from "next/link";
import { MapPin, Calendar, ThumbsUp, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import StatusBadge from "../ui/StatusBadge";
import CategoryBadge from "../ui/CategoryBadge";
import IssueThumb from "./IssueThumb";

export default function IssueCard({ issue }) {
  return (
    <article className="card issue-card">
      <Link href={`/issues/${issue.id}`} className="issue-card__media" tabIndex={-1} aria-hidden="true">
        <IssueThumb category={issue.category} />
      </Link>

      <div className="issue-card__body">
        <div className="issue-card__meta">
          <StatusBadge status={issue.status} />
          <CategoryBadge category={issue.category} />
        </div>

        <h3 className="issue-card__title">
          <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
        </h3>
        <p className="issue-card__excerpt">{issue.description}</p>

        <ul className="issue-card__facts">
          <li>
            <MapPin size={16} aria-hidden="true" />
            <span>{issue.location}</span>
          </li>
          <li>
            <Calendar size={16} aria-hidden="true" />
            <span>{formatDate(issue.date)}</span>
          </li>
        </ul>

        <div className="issue-card__footer">
          <span className="issue-card__support">
            <ThumbsUp size={16} aria-hidden="true" />
            <strong>{issue.supporters}</strong> supporters
          </span>
          <Link href={`/issues/${issue.id}`} className="link-arrow">
            Details
            <ArrowRight size={16} aria-hidden="true" />
            <span className="visually-hidden">for {issue.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
