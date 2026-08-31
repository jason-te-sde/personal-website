import type { Profile } from "./types";

export const profile: Profile = {
  name: "Jason Te",
  headlineTop: "Backend and distributed",
  headlineAccent: "systems engineer.",
  availability: "Open to new-grad backend roles · May 2027",
  intro:
    "I write Java services that have to stay correct under concurrency, failure and retries. Lately also LLM agents, which turn out to need the same discipline.",
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
    value: "12M",
    count: 12,
    suffix: "M",
    label: "invariant checks, 0 violations",
    source: "https://github.com/jason-te-sde/keel#numbers",
  },
  {
    value: "130K",
    count: 130,
    suffix: "K",
    label: "msg/s on AWS, zero loss",
    source: "https://github.com/jason-te-sde/ChatFlow#test-results-summary",
  },
] as const;
