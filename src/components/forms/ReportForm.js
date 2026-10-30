"use client";

import { useState } from "react";
import { Send, RotateCcw, MapPin, CircleCheck, PencilLine } from "lucide-react";
import { CATEGORIES, getCategory } from "@/data/categories";
import { LIMITS, validateReport, validateImage } from "@/lib/validators";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import ImageUpload from "./ImageUpload";

const EMPTY_VALUES = {
  title: "",
  category: "",
  description: "",
  location: "",
  latitude: "",
  longitude: "",
  notes: "",
};

const FIELD_ORDER = ["title", "category", "description", "location", "latitude", "longitude", "notes", "photo"];

export default function ReportForm() {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  function setField(name, value) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field shows an error, re-check it as the person types.
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: validateReport(next, photo)[name] }));
    }
  }

  function checkField(name) {
    setErrors((current) => ({ ...current, [name]: validateReport(values, photo)[name] }));
  }

  function handlePhoto(file) {
    const problem = validateImage(file);
    // An unsuitable file is rejected and explained instead of being previewed.
    if (!problem) setPhoto(file);
    setErrors((current) => ({ ...current, photo: problem || undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validateReport(values, photo);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      setShowSummary(true);
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setShowSummary(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setValues(EMPTY_VALUES);
    setPhoto(null);
    setErrors({});
    setShowSummary(false);
    setSubmitted(false);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (submitted) {
    const category = getCategory(values.category);
    return (
      <div className="card card--padded confirmation" aria-live="polite">
        <span className="confirmation__icon">
          <CircleCheck size={32} aria-hidden="true" />
        </span>
        <h2>Your report passed the checks</h2>
        <p>
          Review the details below. Saving reports is not available yet, so nothing has been sent.
        </p>

        <dl className="summary-list">
          <div>
            <dt>Title</dt>
            <dd>{values.title.trim()}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{category.label}</dd>
          </div>
          <div>
            <dt>Description</dt>
            <dd>{values.description.trim()}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>
              {values.location.trim()}
              {values.latitude && values.longitude ? ` (${values.latitude}, ${values.longitude})` : ""}
            </dd>
          </div>
          {values.notes.trim() && (
            <div>
              <dt>Notes</dt>
              <dd>{values.notes.trim()}</dd>
            </div>
          )}
          <div>
            <dt>Photo</dt>
            <dd>{photo ? photo.name : "None added"}</dd>
          </div>
        </dl>

        <div className="form-actions">
          <Button variant="secondary" icon={PencilLine} onClick={() => setSubmitted(false)}>
            Edit this report
          </Button>
          <Button icon={RotateCcw} variant="ghost" onClick={reset}>
            Start a new report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="report-form">
      {showSummary && errorCount > 0 && (
        <Alert variant="error" role="alert" title="Fix the highlighted fields to continue">
          {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`}
        </Alert>
      )}

      <section className="card card--padded" aria-labelledby="section-problem">
        <h2 className="card__title" id="section-problem">
          The problem
        </h2>
        <p className="card__subtitle">Fields marked with an asterisk are required.</p>

        <div className="form-grid">
          <FormField
            id="title"
            label="Issue title"
            required
            error={errors.title}
            count={values.title.length}
            max={LIMITS.title}
          >
            {(props) => (
              <input
                {...props}
                className="input"
                type="text"
                maxLength={LIMITS.title + 20}
                placeholder="e.g. Deep pothole outside Dhanmondi Lake gate"
                value={values.title}
                onChange={(event) => setField("title", event.target.value)}
                onBlur={() => checkField("title")}
              />
            )}
          </FormField>

          <FormField id="category" label="Category" required error={errors.category}>
            {(props) => (
              <select
                {...props}
                className="select"
                value={values.category}
                onChange={(event) => setField("category", event.target.value)}
                onBlur={() => checkField("category")}
              >
                <option value="">Choose a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField
            id="description"
            label="Description"
            required
            error={errors.description}
            count={values.description.length}
            max={LIMITS.description}
            hint="What is wrong, how long has it been like this, and who does it affect?"
          >
            {(props) => (
              <textarea
                {...props}
                className="textarea"
                rows={5}
                placeholder="Describe the problem in a few sentences"
                value={values.description}
                onChange={(event) => setField("description", event.target.value)}
                onBlur={() => checkField("description")}
              />
            )}
          </FormField>
        </div>
      </section>

      <section className="card card--padded" aria-labelledby="section-location">
        <h2 className="card__title" id="section-location">
          Where is it?
        </h2>

        <div className="form-grid">
          <FormField
            id="location"
            label="Location description"
            required
            error={errors.location}
            count={values.location.length}
            max={LIMITS.location}
            hint="Include a landmark so others can find the spot."
          >
            {(props) => (
              <input
                {...props}
                className="input"
                type="text"
                placeholder="e.g. Road 12, beside Dhanmondi Lake entrance, Dhaka"
                value={values.location}
                onChange={(event) => setField("location", event.target.value)}
                onBlur={() => checkField("location")}
              />
            )}
          </FormField>

          <div className="map-placeholder" aria-label="Map location picker placeholder">
            <MapPin size={22} aria-hidden="true" />
            <div>
              <p className="map-placeholder__title">Map picker</p>
              <p className="field__hint">Add coordinates if you know them. They are optional.</p>
            </div>
          </div>

          <div className="form-grid form-grid--2">
            <FormField
              id="latitude"
              label="Latitude"
              optional
              error={errors.latitude}
              hint="Numbers only, inside Bangladesh."
            >
              {(props) => (
                <input
                  {...props}
                  className="input"
                  type="text"
                  inputMode="decimal"
                  placeholder="23.7461"
                  value={values.latitude}
                  onChange={(event) => setField("latitude", event.target.value)}
                  onBlur={() => checkField("latitude")}
                />
              )}
            </FormField>

            <FormField
              id="longitude"
              label="Longitude"
              optional
              error={errors.longitude}
              hint="Leave both coordinates empty if unsure."
            >
              {(props) => (
                <input
                  {...props}
                  className="input"
                  type="text"
                  inputMode="decimal"
                  placeholder="90.3742"
                  value={values.longitude}
                  onChange={(event) => setField("longitude", event.target.value)}
                  onBlur={() => checkField("longitude")}
                />
              )}
            </FormField>
          </div>

          <FormField
            id="notes"
            label="Additional notes"
            optional
            error={errors.notes}
            count={values.notes.length}
            max={LIMITS.notes}
            hint="Anything else a reviewer should know, such as access, safety or timing."
          >
            {(props) => (
              <textarea
                {...props}
                className="textarea"
                rows={3}
                value={values.notes}
                onChange={(event) => setField("notes", event.target.value)}
                onBlur={() => checkField("notes")}
              />
            )}
          </FormField>
        </div>
      </section>

      <section className="card card--padded" aria-labelledby="section-photo">
        <h2 className="card__title" id="section-photo">
          Photo
        </h2>

        <div className="form-grid">
          <FormField
            id="photo"
            label="Photo of the problem"
            optional
            error={errors.photo}
            hint="JPG, PNG or WebP, up to 5 MB. The photo stays in your browser for now."
          >
            {(props) => (
              <ImageUpload
                id={props.id}
                file={photo}
                onChange={handlePhoto}
                error={errors.photo}
                describedBy={props["aria-describedby"]}
              />
            )}
          </FormField>
        </div>
      </section>

      <div className="form-actions">
        <Button type="submit" size="lg" icon={Send}>
          Check my report
        </Button>
        <Button variant="ghost" icon={RotateCcw} onClick={reset}>
          Clear form
        </Button>
        <p className="field__hint form-actions__note">Checking the form only validates it in your browser.</p>
      </div>
    </form>
  );
}
