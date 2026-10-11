import type { Profile } from "./types";

export const profile: Profile = {
  name: "Jason Te",
  headlineTop: "AI Full-Stack Engineer",
  headlineAccent: "Distributed Systems & Cloud",
  availability: "Open to new-grad roles · May 2027",
  intro:
    "I build AI-powered applications and the distributed systems underneath them. Recent work includes a game store serving 8,000 concurrent shoppers on AWS at a 134 ms p99, a Raft key-value store with a deterministic fault-injection simulator, and semantic search over clinical records using Claude and ChromaDB.",
  // Unused. His own line, but it answers a question no recruiter asked, and
  // volunteering it on the hero invites doubt about how keel was written.
  // Render <p>{profile.pullQuote}</p> under the intro to put it back.
  pullQuote:
    "I lean on AI for analysis and scaffolding. Consistency guarantees I still work out by hand.",
  location: "Seattle, WA",
  email: "jason.te.sde@gmail.com",
  github: "https://github.com/jason-te-sde",
  linkedin: "https://linkedin.com/in/jason-te-sde",
  // The master PDF still carries a phone number in its text layer, so nothing
  // is published yet. Drop a scrubbed PDF in public/ and set this to "/resume".
  resumePath: null,
  headshot: { src: "/headshot.jpg", alt: "Jason Te", width: 240, height: 290 },
  credential: "MS Computer Science, Northeastern University · Graduating May 2027",
};

/** Shown above the fold. Each links to the run that produced it. */
export const stats = [
  {
    value: "60×",
    count: 60,
    suffix: "×",
    label: "write throughput, fsync batching",
    source: "https://github.com/jason-te-sde/keel#numbers",
  },
  {
    value: "134ms",
    count: 134,
    suffix: "ms",
    label: "p99 at 8,000 shoppers on AWS",
    source: "https://github.com/jason-te-sde/till/blob/main/docs/load-test.md#results",
  },
  {
    value: "130K",
    count: 130,
    suffix: "K",
    label: "msg/s on AWS, zero loss",
    source: "https://github.com/jason-te-sde/ChatFlow#test-results-summary",
  },
] as const;
