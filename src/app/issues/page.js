import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import IssuesExplorer from "@/components/issues/IssuesExplorer";

export const metadata = { title: "Explore issues" };

export default function IssuesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Issue directory"
        title="Explore community reports"
        description="Search by place or keyword, then filter by category and status to find the problems that matter to you."
      />
      <Suspense fallback={<div className="container page-body" aria-busy="true" />}>
        <IssuesExplorer />
      </Suspense>
    </>
  );
}
