export default function StatCard({ label, value, hint, icon: Icon }) {
  return (
    <div className="card stat-card">
      <div className="stat-card__head">
        <span>{label}</span>
        {Icon && (
          <span className="stat-card__icon">
            <Icon size={20} aria-hidden="true" />
          </span>
        )}
      </div>
      <p className="stat-card__value">{value}</p>
      {hint && <p className="stat-card__hint">{hint}</p>}
    </div>
  );
}
