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
    slug: "till",
    name: "till",
    status: "featured",
    oneLiner: "A game store that cannot oversell.",
    blurb:
      "A full-stack game store on AWS — React storefront, Spring Boot backend-for-frontend, Kafka, Redis and Aurora on ECS Fargate — in front of a reservation ledger whose rules are a pure function. The storefront can only move stock by asking the ledger, so a bug anywhere in the shop costs a refused checkout, never an oversold copy.",
    bullets: [
      "Took p99 at **8,000 concurrent shoppers** from 20.8 s to **134 ms** at 3,498 req/s, one measured bottleneck at a time, across eighteen recorded runs.",
      "Deciding concurrent checkouts in one write lifted throughput from ~1,200 to **~4,100 checkouts/s**; a Redis cache cut catalogue reads from 398 ms to 34 ms.",
      "A seeded concurrency simulator runs **30M invariant checks** with zero violations; 753 tests.",
    ],
    headlineStat: "p99 134 ms",
    logos: ["openjdk", "spring", "react", "apachekafka", "redis", "terraform"],
    links: { github: "https://github.com/jason-te-sde/till" },
    visual: {
      kind: "image",
      src: "/projects/till-storefront.jpg",
      alt: "The till storefront: a featured-game carousel over procedurally painted cover art and the first shelf of games on sale",
      objectPosition: "center top",
    },
  },
  {
    slug: "distributed-job-queue",
    name: "distributed-job-queue",
    status: "featured",
    oneLiner: "A job queue where a stalled worker cannot overwrite a newer one.",
    blurb:
      "Stateless gRPC brokers in Go over PostgreSQL, delivering each job at least once under a lease. Every lease carries a fencing token and the broker turns away any report that carries an older one, so a worker that stalls past its lease cannot overwrite the result of the job's newer owner. Runs on Kubernetes with a Helm chart, and KEDA scales workers from zero on the backlog.",
    bullets: [
      "**3,781 jobs/s** on one broker on a laptop; at half that rate a job starts **0.97 ms** after it is enqueued, at the median.",
      "Under a **100K-job flood** from one tenant, weighted fair scheduling kept a small tenant's p99 wait at **18 ms**, against 28.5 s first-come-first-served.",
      "A seeded simulator replays **500 seeds** per CI run, checking eight safety invariants after every event, and **nine planted flaws** must each turn the suite red.",
    ],
    headlineStat: "3,781 jobs/s",
    logos: ["go", "postgresql", "kubernetes", "helm", "prometheus"],
    links: { github: "https://github.com/jason-te-sde/distributed-job-queue" },
    visual: { kind: "diagram", id: "jobqueue" },
  },
  {
    slug: "shale",
    name: "shale",
    status: "featured",
    oneLiner: "A storage engine that keeps every write it confirmed.",
    blurb:
      "An embedded LSM-tree key-value store in C++20, in the shape of LevelDB and RocksDB, with no third-party runtime dependency. Every file operation goes through an injected filesystem that can lose power, so a crash at any byte is a seeded test that fails the same way tomorrow.",
    bullets: [
      "After **every** simulated step the database must match a reference model; after a crash it must hold a prefix of the acknowledged writes, never half a batch.",
      "**200 real kill -9 rounds** per CI run. One on macOS left the MANIFEST ending in 438 zero bytes; v0.1.1 opens it.",
      "Writes level with LevelDB at **0.98–0.99×** its ops/s, benchmarked side by side on the same machine.",
    ],
    headlineStat: "200× kill -9",
    logos: ["cplusplus", "cmake", "linux"],
    links: { github: "https://github.com/jason-te-sde/shale" },
    visual: { kind: "diagram", id: "shale" },
  },
  {
    slug: "quarry",
    name: "quarry",
    status: "featured",
    oneLiner: "A SQL engine whose every answer is checked against DuckDB.",
    blurb:
      "A vectorized SQL query engine in C++20 over Apache Arrow and Parquet. It plans a SELECT with a small rule-based and cost-based optimizer and runs it on Arrow column batches with its own kernels, hash joins and hash aggregation. Single-threaded and read-only, with joins and aggregations that spill to disk under a memory limit.",
    bullets: [
      "Every result is compared with **DuckDB's**: the four TPC-H-derived queries cell by cell, and a seeded generator of random tables and queries run on both engines on every push and nightly.",
      "Joins and aggregations that do not fit **spill to disk** under a memory limit and return the same answer; the TPC-H queries under a 64 KiB limit match DuckDB too.",
      "A fix to the join-size estimate took Q5 from **4,730 ms to 590.5 ms** and its peak memory from 6,288 MiB to 125 MiB.",
    ],
    headlineStat: "Q5 4,730 → 590.5 ms",
    headlineSource: "https://github.com/jason-te-sde/quarry/blob/v0.1.0/README.md#L279",
    meta: "v0.1.0 · MIT",
    logos: ["cplusplus", "apachearrow", "apacheparquet", "duckdb", "cmake"],
    links: { github: "https://github.com/jason-te-sde/quarry" },
    visual: { kind: "diagram", id: "quarry" },
  },
  {
    slug: "arxiv-research-agent",
    name: "arxiv-research-agent",
    status: "featured",
    oneLiner: "A research agent whose citations are checked.",
    blurb:
      "A ReAct agent that answers questions about arXiv papers, streamed over Server-Sent Events from FastAPI. Retrieval runs in two stages, embedding search and then a cross-encoder, over 65 papers pinned to exact versions, and every citation in an answer is checked against the passages the agent actually retrieved.",
    bullets: [
      "Reranking adds **0.164 MRR@5** on a 30-question test set, with a 95% interval of +0.039 to +0.297.",
      "RAGAS context precision **0.91** and faithfulness 0.78 with local models only; every evaluation run is committed.",
    ],
    headlineStat: "+0.164 MRR@5",
    logos: ["python", "fastapi", "ollama"],
    links: { github: "https://github.com/jason-te-sde/arxiv-research-agent" },
    visual: { kind: "diagram", id: "arxiv" },
  },
  {
    slug: "jd-resume-tailor",
    name: "jd-resume-tailor",
    status: "featured",
    oneLiner: "A resume tailor whose rewrites are checked against the facts.",
    blurb:
      "Tailors a one-page resume to a job description from a bank of facts. A model chooses the entries and rewrites each bullet from the facts it cites; a fact-consistency verifier checks every rewrite for numbers, technologies and claims its facts do not hold. A bullet that fails is rewritten once, then replaced by the bank's own sentence, and the result is a one-page LaTeX PDF.",
    bullets: [
      "By labels from the facts on a sample of each, **about 32%** of the model's first rewrites carried a violation (95% interval 21.3% to 44.2%), and **about 9%** of the rewritten bullets that passed the gate do (5.4% to 17.3%). qwen3:8b, 12 postings, 3 seeds, 36 runs.",
      "The verifier catches **52 of 57** violations on its holdout (0.91), with 0 of 27 clean rows flagged.",
      "CI replays a recorded run with no model, and recomputes every scored result from its committed inputs.",
    ],
    headlineStat: "violations ~32% → ~9%",
    headlineSource: "https://github.com/jason-te-sde/jd-resume-tailor/blob/v0.1.0/README.md#L30-L33",
    meta: "v0.1.0 · MIT",
    logos: ["python", "ollama", "latex"],
    links: { github: "https://github.com/jason-te-sde/jd-resume-tailor" },
    visual: { kind: "diagram", id: "tailor" },
  },
  {
    slug: "timeseriesguard",
    name: "TimeSeriesGuard",
    status: "featured",
    oneLiner: "Anomaly detection under a protocol random scores cannot beat.",
    blurb:
      "Four detectors, from a robust z-score to an LSTM autoencoder, on the 28 machines of the Server Machine Dataset. Most published results use point adjust, under which uniform random scores reach an F1 of 0.77; this project reports event-level AUC-PR, and picks every threshold, hyper-parameter and the headline model without a single test label.",
    bullets: [
      "**0.70 event-level AUC-PR** for the headline model (95% interval 0.62–0.78), where random scores get 0.04.",
      "**Ten planted leakage defects**, each caught by the guard named for it; the guards are refusals in the code, not review notes.",
      "A FastAPI service scores one row within 1e-6 of the batch score, at a **6.7 ms p95** in its container on a laptop.",
    ],
    headlineStat: "AUC-PR 0.70",
    logos: ["python", "pytorch", "scikitlearn", "mlflow", "fastapi"],
    links: { github: "https://github.com/jason-te-sde/timeseriesguard" },
    visual: { kind: "diagram", id: "tsguard" },
  },
  {
    slug: "collabdocs",
    name: "CollabDocs",
    status: "featured",
    oneLiner: "A collaborative editor that checks the role on every event.",
    blurb:
      "A real-time collaborative document editor: Yjs CRDT sync and awareness over Socket.IO, TipTap bound to the document, live cursors and presence. A role on every document is checked on every REST route and every socket event. Updates are logged in PostgreSQL and compacted into snapshots, and several collab instances relay through Redis.",
    bullets: [
      "Sync latency **p95 6.7 ms** with 50 concurrent editors on one document, well under the 100 ms target in every one of three load-test runs.",
      "With all **100 editors** typing at once, the median p95 is 8.5 ms.",
      "A property test checks that random concurrent edits, delivered late, out of order and across a disconnect, always converge; edits made offline are kept in IndexedDB and merged on reconnect.",
    ],
    headlineStat: "p95 6.7 ms sync",
    headlineSource: "https://github.com/jason-te-sde/collabdocs/blob/v0.1.0/README.md#L147",
    meta: "v0.1.0",
    logos: ["nextdotjs", "socketdotio", "postgresql", "prisma", "redis", "typescript"],
    links: { github: "https://github.com/jason-te-sde/collabdocs" },
    visual: { kind: "diagram", id: "collabdocs" },
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
    slug: "pipeci",
    name: "PipeCI",
    status: "secondary",
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
    slug: "cairn",
    name: "cairn",
    status: "secondary",
    oneLiner: "A deterministic model registry.",
    blurb:
      "An AI model registry rebuilt from the defects of a real one: immutable versions, content-addressed artifacts and exactly-once side effects, with the rules as one pure function and a seeded simulator checking twelve invariants after every step.",
    bullets: [
      "Eight known defects are put back on purpose, and the check that catches each is **asserted, not documented**.",
      "537 tests, 86.8% coverage, one runtime dependency; it found six real bugs in itself.",
    ],
    logos: ["openjdk", "apachemaven", "docker"],
    links: { github: "https://github.com/jason-te-sde/cairn" },
    visual: { kind: "diagram", id: "cairn" },
  },
  {
    slug: "nano-claude-code",
    name: "nano-claude-code",
    status: "secondary",
    oneLiner: "A terminal coding agent that brings its own models.",
    blurb:
      "An open-source terminal coding agent for the Anthropic API, any OpenAI-compatible endpoint, or a local Ollama server — with a different model per role, so exploring a codebase does not have to cost what writing the fix does.",
    bullets: [
      "A read-only **explore sub-agent** runs on its own model, so searching a codebase can go to a cheaper one than writing the fix.",
      "An **MCP client** that pins every tool's definition and asks again when one changes, checked by hand against the official reference servers.",
      "Every file write passes a permission engine first; 4,955 tests; not yet released.",
    ],
    badge: "In progress",
    logos: ["python", "anthropic", "ollama"],
    links: { github: "https://github.com/jason-te-sde/nano-claude-code" },
    visual: { kind: "diagram", id: "nano" },
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
