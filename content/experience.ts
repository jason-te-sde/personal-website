import type { Experience } from "./types";

/** Ordered by relevance to backend roles, not reverse-chronology. */
export const experience: Experience[] = [
  {
    slug: "onye",
    role: "Software Engineer Intern",
    company: "Onye Inc. · medical imaging",
    mark: "On",
    markClass: "border-accent/30 from-accent/25 to-brand-700/20 text-accent",
    dates: "Jun – Aug 2026",
    location: "Brooklyn, NY",
    summary:
      "Shipped features across a HIPAA-oriented radiology platform — four user personas, 65 pages, 81 API routes.",
    bullets: [
      "Built the **study lifecycle state machine**, so a scan only moves between states a clinician is allowed to move it between.",
      "Added **SHA-256 integrity verification** over resumable uploads — a multi-gigabyte scan cut off at 90% resumes and still proves it arrived intact.",
      "Authored an **AAL2 session guard** forcing re-authentication on privileged routes.",
    ],
    logos: ["nextdotjs", "typescript", "postgresql", "supabase"],
  },
  {
    slug: "alibaba",
    role: "Software Engineer",
    company: "Alibaba Group · Freshippo",
    mark: "Al",
    markClass: "border-orange-500/25 from-orange-500/20 to-amber-600/10 text-orange-300",
    dates: "Sep 2019 – Jan 2020",
    location: "Shanghai",
    summary:
      "Inventory and reconciliation tooling for a grocery chain where a stock error means an empty shelf that afternoon.",
    bullets: [
      "Automated daily reconciliation, cutting the manual pass by **80%**.",
      "Reworked pick-path ordering, lifting picker efficiency **30%** and cutting out-of-stock events **25%**.",
    ],
    logos: ["openjdk", "spring", "mysql", "redis"],
  },
  {
    slug: "tankahkee",
    role: "Student Researcher",
    company: "Tan Kah Kee Innovation Laboratory",
    mark: "TK",
    markClass: "border-sky-500/25 from-sky-500/20 to-cyan-600/10 text-sky-300",
    dates: "Sep 2023 – Jun 2025",
    location: "Xiamen",
    summary:
      "Signal processing for single-molecule electronics, where the events that matter are the rare ones and most of the data is noise.",
    bullets: [
      "Built a multi-variate visualization platform that cut analysis time **50%**.",
      "Trained a **Transformer classifier** for conductance curves, raising valid-signal extraction **30%**.",
    ],
    note:
      'Co-authored "Low-probability events detection using unsupervised multi-prototype clustering for single-molecule electronics", **Nano Research** 18(4), 2025.',
    logos: ["python", "pytorch"],
  },
];
