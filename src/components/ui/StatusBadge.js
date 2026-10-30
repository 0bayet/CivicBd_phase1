import { getStatus } from "@/data/statuses";

export default function StatusBadge({ status }) {
  const { label, icon: Icon } = getStatus(status);
  return (
    <span className={`badge badge--${status}`}>
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  );
}
