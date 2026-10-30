import { Info, TriangleAlert, CircleAlert, CircleCheck } from "lucide-react";

const ICONS = {
  info: Info,
  warning: TriangleAlert,
  error: CircleAlert,
  success: CircleCheck,
};

export default function Alert({ variant = "info", title, children, role, className = "" }) {
  const Icon = ICONS[variant];
  return (
    <div className={`alert alert--${variant} ${className}`.trim()} role={role}>
      <Icon size={20} aria-hidden="true" />
      <div>
        {title && <p className="alert__title">{title}</p>}
        {children && <p>{children}</p>}
      </div>
    </div>
  );
}
