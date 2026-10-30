"use client";

import { TriangleAlert, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function GlobalError({ reset }) {
  return (
    <div className="container not-found">
      <span className="state-panel__icon state-panel--error">
        <TriangleAlert size={32} aria-hidden="true" />
      </span>
      <h1>Something went wrong</h1>
      <p>The page could not be shown. Try again, or go back to the home page.</p>
      <div className="form-actions">
        <Button icon={RotateCcw} onClick={() => reset()}>
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Go to home page
        </Button>
      </div>
    </div>
  );
}
