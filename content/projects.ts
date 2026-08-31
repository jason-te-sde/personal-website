import type { Project } from "./types";

/**
 * Only projects that exist and are verifiable. The experience bank also holds ~20
 * generated "future project" blueprints with no repos — none of them belong here.
 */
export const projects: Project[] = [
  {
    slug: "keel",
    name: "keel",
    status: "flagship",
    oneLiner: "A linearizable distributed key-value store.",
    blurb:
      "Raft written from scratch as a pure state machine — no threads, no clock, no I/O. A whole cluster's behaviour is a function of one integer seed, so a bug found at seed 8123 is still there at seed 8123 tomorrow.",
    bullets: [
      "Asserts **every safety property in the paper** after every step of a seeded simulation.",
      "Found **three safety violations** hand-written tests could not reach — seeds 1695, 1537, 2626.",
      "Mutual TLS, token auth, Prometheus metrics, and a runbook written for three in the morning.",
    ],
    meta: "v0.3.1 · MIT",
    badge: "Flagship",
    logos: ["openjdk", "docker", "prometheus", "rocksdb"],
    links: {
      github: "https://github.com/jason-te-sde/keel",
      docs: "https://jason-te-sde.github.io/keel/",
      caseStudy: "/projects/keel",
    },
    visual: { kind: "terminal" },
  },
  {
    slug: "chatflow",
    name: "ChatFlow",
    status: "featured",
    oneLiner: "Real-time chat that fans out through RabbitMQ.",
    blurb:
      "Real-time chat that fans out through four WebSocket servers into a RabbitMQ topic exchange with 20 durable queues, behind an AWS load balancer with sticky sessions.",
    bullets: [
      "Sustained **129,727 msg/s** across four instances with zero failed messages.",
      "Load tests showed the bottleneck was the single consumer instance, not the WebSocket tier.",
    ],
    headlineStat: "130K msg/s",
    logos: ["openjdk", "spring", "rabbitmq", "postgresql"],
    links: { github: "https://github.com/jason-te-sde/ChatFlow" },
    visual: {
      kind: "image",
      src: "/projects/chatflow-arch.png",
      alt: "ChatFlow architecture: client to AWS load balancer, four WebSocket servers, a RabbitMQ exchange with 20 room queues, and a 20-thread consumer broadcasting back",
      objectPosition: "center 38%",
      light: true,
    },
  },
  {
    slug: "ehr-media-intelligence",
    name: "EHR Media Intelligence",
    status: "featured",
    oneLiner: "Semantic search over messy clinical records.",
    blurb:
      "Semantic search and summarization over clinical records that arrive as PDFs, scan metadata and spreadsheets. The take-home that turned into my Onye offer.",
    bullets: [
      "Provider-agnostic backend — falls back from a hosted model to a local one, so a demo never dies on a rate limit.",
      "Answers cite the source document, because an unsourced clinical summary is worse than none.",
    ],
    headlineStat: "p95 < 100ms",
    logos: ["python", "fastapi", "docker", "claude"],
    links: { github: "https://github.com/jason-te-sde/ehr-media-intelligence-platform" },
    visual: { kind: "diagram", id: "ehr" },
  },
  {
    slug: "pipeci",
    name: "PipeCI",
    status: "featured",
    oneLiner: "A CI/CD pipeline engine, built by five of us.",
    blurb:
      "A CI/CD pipeline engine with YAML validation, dry-run planning and topologically ordered job scheduling. Five of us built it; the diagram shows which half was mine.",
    bullets: [
      "Owned **release engineering and observability** — Helm charts, dashboards, and traces that cross job boundaries.",
    ],
    ownership: "The scheduling engine core was a teammate's.",
    headlineStat: "team of 5",
    logos: ["kubernetes", "helm", "grafana", "opentelemetry"],
    links: { github: "https://github.com/jason-te-sde/CI-CD-Pipeline-System" },
    visual: { kind: "diagram", id: "pipeci" },
  },
  {
    slug: "snapcal",
    name: "SnapCal",
    status: "secondary",
    oneLiner: "Screenshot an invite, get a calendar event.",
    blurb:
      "Press a hotkey, drag over a screenshot of an invite, and the event lands on your calendar. A Python desktop capture app plus a web companion, wired to Google and Outlook over OAuth with ICS export as a fallback.",
    bullets: [],
    logos: ["python", "react", "typescript", "vite"],
    links: {},
    visual: {
      kind: "image",
      src: "/projects/snapcal.png",
      alt: "SnapCal landing page: Screenshot to Calendar in Seconds, with Capture, Extract and Sync steps",
      objectPosition: "center top",
      light: true,
    },
  },
  {
    slug: "medtriage",
    name: "MedTriage Agent",
    status: "secondary",
    oneLiner: "Symptom text in, ordered triage queue out.",
    blurb:
      "Built in a weekend at the Insforge × Qoder hackathon in Seattle. Splitting extraction from scoring is what made the urgency numbers stable enough to sort a queue by.",
    bullets: [
      "One prompt asking for a score straight from free text drifted between runs; two steps did not.",
      "The queue is the product — a score nobody acts on is just a number.",
    ],
    badge: "Hackathon",
    logos: ["react", "claude", "vite", "tailwindcss"],
    links: { github: "https://github.com/jason-te-sde/Ai_Hackathon" },
    visual: { kind: "diagram", id: "medtriage" },
  },
];

export const flagship = projects[0];
export const featured = projects.filter((p) => p.status === "featured");
export const secondary = projects.filter((p) => p.status === "secondary");
