// Sample reports used throughout Phase 1. None of these are real reports.
export const DEMO_ISSUES = [
  {
    id: "CIR-2017",
    title: "Public bin missing at Banani playground entrance",
    description:
      "The bin that used to sit at the playground gate has been removed and visitors now leave rubbish along the boundary wall. Families with small children use this entrance every evening.",
    category: "waste",
    status: "pending",
    location: "Banani playground, Dhaka",
    date: "2026-10-26",
    supporters: 22,
  },
  {
    id: "CIR-2023",
    title: "Overflowing drain beside Zindabazar market",
    description:
      "The open drain beside the market entrance is overflowing onto the walkway. Shopkeepers say it gets worse after every afternoon shower and the smell reaches the nearby stalls.",
    category: "drainage",
    status: "pending",
    location: "Zindabazar, Sylhet",
    date: "2026-10-25",
    supporters: 38,
  },
  {
    id: "CIR-2035",
    title: "Waterlogged footpath after evening rain in Uttara",
    description:
      "The footpath in front of the market in Sector 7 stays flooded for hours after rain, forcing pedestrians to walk on the main road beside moving traffic.",
    category: "drainage",
    status: "pending",
    location: "Sector 7, Uttara, Dhaka",
    date: "2026-10-24",
    supporters: 61,
  },
  {
    id: "CIR-2011",
    title: "Park benches damaged at Rajshahi city park",
    description:
      "Three benches along the main path have broken slats and exposed screws. Older visitors can no longer sit safely while walking the loop.",
    category: "infrastructure",
    status: "pending",
    location: "City park, Rajshahi",
    date: "2026-10-22",
    supporters: 17,
  },
  {
    id: "CIR-2038",
    title: "Garbage piling up beside Mirpur 10 bus stop",
    description:
      "Waste from the surrounding shops is being dumped next to the bus stop and has not been collected for several days. Commuters waiting for buses stand in the middle of the road to avoid it.",
    category: "waste",
    status: "verified",
    location: "Mirpur 10, Dhaka",
    date: "2026-10-21",
    supporters: 76,
  },
  {
    id: "CIR-2009",
    title: "Low water pressure in Shahjadpur households",
    description:
      "Households on the upper floors have had very little water in the mornings for over two weeks. Residents are paying for tanker deliveries to cover the gap.",
    category: "water",
    status: "verified",
    location: "Shahjadpur, Dhaka",
    date: "2026-10-20",
    supporters: 54,
  },
  {
    id: "CIR-2019",
    title: "Damaged streetlight pole at Boyra crossing",
    description:
      "A streetlight pole at the crossing is leaning after a vehicle struck it. The lamp is out and the wiring at the base is exposed.",
    category: "streetlight",
    status: "verified",
    location: "Boyra crossing, Khulna",
    date: "2026-10-14",
    supporters: 71,
  },
  {
    id: "CIR-2002",
    title: "Large pothole on Road 12 near Dhanmondi Lake",
    description:
      "A deep pothole has opened in the left lane close to the lake gate. Rickshaws and motorbikes swerve around it, and it fills with water after rain so the depth is hard to judge.",
    category: "roads",
    status: "in_progress",
    location: "Road 12, Dhanmondi, Dhaka",
    date: "2026-10-18",
    supporters: 148,
  },
  {
    id: "CIR-2014",
    title: "Streetlights out along the Agrabad access road",
    description:
      "Six consecutive streetlights have been off for about ten days. The stretch is very dark after 7 pm and shop owners have started closing early.",
    category: "streetlight",
    status: "in_progress",
    location: "Agrabad access road, Chattogram",
    date: "2026-10-16",
    supporters: 93,
  },
  {
    id: "CIR-2006",
    title: "Broken footpath slabs near Chawkbazar",
    description:
      "Several footpath slabs have cracked and tilted, leaving gaps that catch wheelchairs and trolleys. The damage runs for roughly twenty metres.",
    category: "roads",
    status: "resolved",
    location: "Chawkbazar, Chattogram",
    date: "2026-10-12",
    supporters: 47,
  },
  {
    id: "CIR-2004",
    title: "Broken railing at the Kazir Dewri overpass stairs",
    description:
      "A section of the stair railing had come loose and was hanging over the drop. It has since been welded back into place.",
    category: "infrastructure",
    status: "resolved",
    location: "Kazir Dewri, Chattogram",
    date: "2026-10-09",
    supporters: 35,
  },
  {
    id: "CIR-2001",
    title: "Leaking water main on Station Road",
    description:
      "A burst pipe was sending water across the road for several days. The pipe has been replaced and the surface has been patched.",
    category: "water",
    status: "resolved",
    location: "Station Road, Rajshahi",
    date: "2026-10-05",
    supporters: 29,
  },
];

export function getIssueById(id) {
  return DEMO_ISSUES.find((issue) => issue.id === id);
}

export function getDemoStats(issues = DEMO_ISSUES) {
  const count = (status) => issues.filter((issue) => issue.status === status).length;
  return {
    total: issues.length,
    pending: count("pending"),
    verified: count("verified"),
    inProgress: count("in_progress"),
    resolved: count("resolved"),
    supporters: issues.reduce((sum, issue) => sum + issue.supporters, 0),
  };
}
