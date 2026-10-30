import { ImageOff } from "lucide-react";
import { getCategory } from "@/data/categories";

// Shown in place of a photo when a report has none.
export default function IssueThumb({ category, tall = false }) {
  const { icon: Icon, label } = getCategory(category);
  return (
    <div
      className={`issue-thumb tone-${category} ${tall ? "issue-thumb--tall" : ""}`.trim()}
      role="img"
      aria-label={`No photo for this ${label.toLowerCase()} report`}
    >
      <span className="issue-thumb__icon">
        <Icon size={28} aria-hidden="true" />
      </span>
      <span className="issue-thumb__note">
        <ImageOff size={14} aria-hidden="true" />
        No photo attached
      </span>
    </div>
  );
}
