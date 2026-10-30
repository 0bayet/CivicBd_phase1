import {
  Construction,
  Trash2,
  Waves,
  Lightbulb,
  Building2,
  Droplet,
  CircleHelp,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "roads",
    label: "Roads & potholes",
    shortLabel: "Roads",
    description: "Damaged roads, potholes and broken footpaths.",
    icon: Construction,
  },
  {
    id: "waste",
    label: "Garbage & waste",
    shortLabel: "Waste",
    description: "Uncollected garbage, overflowing bins and dumping.",
    icon: Trash2,
  },
  {
    id: "drainage",
    label: "Drainage & waterlogging",
    shortLabel: "Drainage",
    description: "Blocked drains and streets that flood after rain.",
    icon: Waves,
  },
  {
    id: "streetlight",
    label: "Streetlights",
    shortLabel: "Streetlights",
    description: "Dark streets, broken lamps and damaged poles.",
    icon: Lightbulb,
  },
  {
    id: "infrastructure",
    label: "Public infrastructure",
    shortLabel: "Infrastructure",
    description: "Damaged parks, railings, benches and public property.",
    icon: Building2,
  },
  {
    id: "water",
    label: "Water supply",
    shortLabel: "Water",
    description: "Broken pipes, leaking taps and supply problems.",
    icon: Droplet,
  },
  {
    id: "other",
    label: "Other issues",
    shortLabel: "Other",
    description: "Anything else that needs the community’s attention.",
    icon: CircleHelp,
  },
];

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}
