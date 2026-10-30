"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { formatFileSize } from "@/lib/format";

/**
 * Photo picker with click-to-browse, drag and drop and a local preview.
 * The file stays in the browser: it is only previewed.
 */
export default function ImageUpload({ id, file, onChange, error, describedBy }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function choose(selected) {
    if (selected) onChange(selected);
  }

  function remove() {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.focus();
  }

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        className="visually-hidden dropzone__input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        onChange={(event) => choose(event.target.files?.[0])}
      />

      {file && previewUrl ? (
        <div className="upload-preview">
          {/* A blob: URL cannot be optimised by next/image, so a plain img is used here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Preview of the selected photo" className="upload-preview__image" />
          <div className="upload-preview__info">
            <p className="upload-preview__name">{file.name}</p>
            <p className="field__hint">{formatFileSize(file.size)}</p>
          </div>
          <button type="button" className="btn btn--secondary btn--sm" onClick={remove}>
            <X size={16} aria-hidden="true" />
            Remove photo
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`dropzone ${dragging ? "dropzone--active" : ""} ${error ? "dropzone--error" : ""}`.trim()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            choose(event.dataTransfer.files?.[0]);
          }}
        >
          <span className="dropzone__icon">
            <ImagePlus size={26} aria-hidden="true" />
          </span>
          <span className="dropzone__title">Choose a photo</span>
          <span className="dropzone__hint">Click to browse, or drag a file here</span>
          <span className="dropzone__rules">
            <Upload size={14} aria-hidden="true" />
            JPG, PNG or WebP, up to 5 MB
          </span>
        </label>
      )}
    </div>
  );
}
