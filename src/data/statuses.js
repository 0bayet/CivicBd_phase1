import { Clock, ShieldCheck, Wrench, CircleCheck } from "lucide-react";

export const STATUSES = [
  { id: "pending", label: "Pending", icon: Clock, meaning: "Waiting for review" },
  { id: "verified", label: "Verified", icon: ShieldCheck, meaning: "Confirmed by residents" },
  { id: "in_progress", label: "In progress", icon: Wrench, meaning: "Work has started" },
  { id: "resolved", label: "Resolved", icon: CircleCheck, meaning: "Marked as fixed" },
];

export function getStatus(id) {
  return STATUSES.find((status) => status.id === id) ?? STATUSES[0];
}
