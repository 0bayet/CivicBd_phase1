import { CircleAlert } from "lucide-react";

/**
 * Wraps a form control with its label, hint, counter and error message.
 * The control is created by the `children` function, which receives the
 * accessibility props (id, aria-invalid, aria-describedby) to spread on it:
 *
 *   <FormField id="title" label="Title" error={errors.title}>
 *     {(props) => <input className="input" {...props} />}
 *   </FormField>
 */
export default function FormField({ id, label, required, optional, hint, error, count, max, children }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="field">
      <div className="field__top">
        <label className="field__label" htmlFor={id}>
          {label}
          {required && (
            <span className="field__required" aria-hidden="true">
              *
            </span>
          )}
          {optional && <span className="field__hint"> (optional)</span>}
        </label>
        {typeof count === "number" && max && (
          <span className="field__counter" aria-hidden="true">
            {count}/{max}
          </span>
        )}
      </div>

      {children({
        id,
        "aria-invalid": error ? "true" : undefined,
        "aria-describedby": describedBy,
        "aria-required": required ? "true" : undefined,
      })}

      {error && (
        <p className="field__error" id={errorId}>
          <CircleAlert size={14} aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
      {hint && (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
}
