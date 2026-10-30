export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <header className="page-header">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-header__lead">{description}</p>}
        {children}
      </div>
    </header>
  );
}
