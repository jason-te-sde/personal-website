/** Content types. Every file under content/ is hand-curated on purpose — see README. */

export interface Profile {
  name: string;
  headlineTop: string;
  headlineAccent: string;
  availability: string;
  intro: string;
  /** The one line no competing candidate can copy. Rendered with an accent rule. */
  pullQuote: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  /** null until a phone-free PDF exists — see README. CTAs degrade to email. */
  resumePath: string | null;
  headshot: { src: string; alt: string; width: number; height: number };
  credential: string;
}

/** A number on the site must carry the artifact that proves it. `source` is required. */
export interface Stat {
  value: string;
  /** Numeric part for the count-up animation; omit for values that shouldn't animate. */
  count?: number;
  suffix?: string;
  label: string;
  source: string;
}

export type ProjectStatus = "flagship" | "featured" | "secondary";

/** How a project's cover visual is produced. */
export type Visual =
  | { kind: "image"; src: string; alt: string; objectPosition?: string; light?: boolean }
  | { kind: "terminal" }
  | { kind: "diagram"; id: "ehr" | "pipeci" | "medtriage" };

export interface Project {
  slug: string;
  name: string;
  status: ProjectStatus;
  oneLiner: string;
  blurb: string;
  bullets: string[];
  /** Ownership disclosure. Rendered dimmed, below the bullets. */
  ownership?: string;
  meta?: string;
  headlineStat?: string;
  badge?: string;
  logos: string[];
  links: { github?: string; live?: string; docs?: string; caseStudy?: string };
  visual: Visual;
}

export interface Experience {
  slug: string;
  role: string;
  company: string;
  mark: string;
  markClass: string;
  dates: string;
  location: string;
  summary: string;
  bullets: string[];
  note?: string;
  logos: string[];
}

export interface StackGroup {
  label: string;
  /** Simple Icons slugs. */
  logos: string[];
  /** Tools with no Simple Icons mark (Amazon, gRPC, WebSocket, ChromaDB). */
  text: string[];
  wide?: boolean;
}

export interface EducationEntry {
  school: string;
  degree: string;
  kicker: string;
  place: string;
  dates: string;
  gpa?: string;
  current?: boolean;
}
