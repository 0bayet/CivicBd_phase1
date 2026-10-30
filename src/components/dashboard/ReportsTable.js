import Link from "next/link";
import { formatDate } from "@/lib/format";
import DataTable from "../ui/DataTable";
import StatusBadge from "../ui/StatusBadge";
import CategoryBadge from "../ui/CategoryBadge";

/** Reusable table of reports. Optional columns are switched on with props. */
export default function ReportsTable({ caption, issues, showLocation = false, showSupporters = false }) {
  const columns = [
    { key: "id", header: "Reference", render: (issue) => <span className="table__id">{issue.id}</span> },
    { key: "title", header: "Title", render: (issue) => <span className="table__title">{issue.title}</span> },
    { key: "category", header: "Category", render: (issue) => <CategoryBadge category={issue.category} /> },
  ];

  if (showLocation) columns.push({ key: "location", header: "Location" });
  if (showSupporters) columns.push({ key: "supporters", header: "Supporters" });

  columns.push(
    { key: "status", header: "Status", render: (issue) => <StatusBadge status={issue.status} /> },
    { key: "date", header: "Reported", render: (issue) => formatDate(issue.date) },
    {
      key: "view",
      header: "Details",
      render: (issue) => (
        <Link href={`/issues/${issue.id}`} className="link-arrow">
          View
          <span className="visually-hidden"> {issue.title}</span>
        </Link>
      ),
    }
  );

  return (
    <DataTable
      caption={caption}
      columns={columns}
      rows={issues}
      getRowKey={(issue) => issue.id}
      emptyMessage="No reports to show."
    />
  );
}
