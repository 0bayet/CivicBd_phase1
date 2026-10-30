import { getCategory } from "@/data/categories";

export default function CategoryBadge({ category }) {
  const { shortLabel, icon: Icon } = getCategory(category);
  return (
    <span className={`badge badge--category tone-${category}`}>
      <Icon size={14} aria-hidden="true" />
      {shortLabel}
    </span>
  );
}
