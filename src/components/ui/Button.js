import Link from "next/link";

/**
 * Renders a link when `href` is given, otherwise a button.
 * variant: "primary" | "secondary" | "ghost"   size: "sm" | "md" | "lg"
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconAfter: IconAfter,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, block ? "btn--block" : "", className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
      {IconAfter && <IconAfter size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
