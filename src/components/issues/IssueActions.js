"use client";

import { useState } from "react";
import { ThumbsUp, Link2, Check } from "lucide-react";
import Button from "../ui/Button";

export default function IssueActions({ supporters }) {
  const [supported, setSupported] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="card card--padded issue-actions" aria-labelledby="actions-title">
      <h2 className="card__title" id="actions-title">
        Take action
      </h2>
      <p className="issue-actions__count" role="status" aria-live="polite">
        <strong>{supporters + (supported ? 1 : 0)}</strong> people support this report
      </p>
      <Button
        block
        variant={supported ? "secondary" : "primary"}
        icon={supported ? Check : ThumbsUp}
        aria-pressed={supported}
        onClick={() => setSupported((value) => !value)}
      >
        {supported ? "Supported" : "Support this report"}
      </Button>
      <Button block variant="secondary" icon={copied ? Check : Link2} onClick={copyLink}>
        {copied ? "Link copied" : "Copy link"}
      </Button>
    </section>
  );
}
