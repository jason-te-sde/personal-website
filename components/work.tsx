import Image from "next/image";
import Link from "next/link";
import type { Project, Visual } from "@/content/types";
import { flagship, featured, secondary } from "@/content/projects";
import { DIAGRAMS } from "./diagrams";
import { TypingTerminal } from "./client/typing-terminal";
import { LogoRow } from "./logo-chip";
import { RichText } from "./rich-text";
import { ExternalLink } from "./section";

const IMG_SIZE: Record<string, { w: number; h: number }> = {
  "/projects/chatflow-arch.png": { w: 1322, h: 1010 },
  "/projects/snapcal.png": { w: 1280, h: 900 },
};

function ProjectVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "terminal") return <TypingTerminal />;
  if (visual.kind === "diagram") {
    const Diagram = DIAGRAMS[visual.id];
    return (
      <div className="rounded-xl border border-white/[.06] bg-black/30 p-4">
        <Diagram />
      </div>
    );
  }
  const size = IMG_SIZE[visual.src] ?? { w: 1200, h: 800 };
  return (
    <div className="shot aspect-[16/10]">
      <Image
        src={visual.src}
        alt={visual.alt}
        width={size.w}
        height={size.h}
        style={visual.objectPosition ? { objectPosition: visual.objectPosition } : undefined}
      />
    </div>
  );
}

function Bullets({ items, dim = false }: { items: string[]; dim?: boolean }) {
  return (
    <ul className="mt-4 space-y-2 text-[13px] text-zinc-400">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5">
          <span
            className={`mt-[7px] h-1 w-1 shrink-0 rounded-full ${dim ? "bg-zinc-600" : "bg-accent"}`}
          />
          <span>
            <RichText>{b}</RichText>
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const { links } = project;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
      {links.caseStudy && (
        <Link href={links.caseStudy} className="text-accent link-underline">
          Read the case study →
        </Link>
      )}
      {links.github && (
        <ExternalLink href={links.github} className="text-zinc-400 link-underline hover:text-zinc-100">
          GitHub ↗
        </ExternalLink>
      )}
      {links.docs && (
        <ExternalLink href={links.docs} className="text-zinc-400 link-underline hover:text-zinc-100">
          Javadoc ↗
        </ExternalLink>
      )}
    </div>
  );
}

function Flagship({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className="reveal glow mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[.02]"
    >
      <div className="grad-rule h-[2px]" />
      <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
              {project.badge}
            </span>
            <span className="font-mono text-[11px] text-zinc-600">{project.meta}</span>
          </div>
          <h3 className="mt-3.5 text-3xl font-bold tracking-tight text-zinc-50">{project.name}</h3>
          <p className="mt-1.5 text-[15px] font-medium text-zinc-300">{project.oneLiner}</p>
          <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-400">{project.blurb}</p>
          <ul className="mt-5 space-y-3 text-[13.5px]">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-zinc-400">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_#A855F7]" />
                <span>
                  <RichText>{b}</RichText>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <LogoRow slugs={project.logos} />
          </div>
          <ProjectLinks project={project} />
        </div>
        <ProjectVisual visual={project.visual} />
      </div>
    </article>
  );
}

/** Wide row, visual and text side by side, alternating which side the visual sits on. */
function FeaturedRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="reveal glow mt-4 overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.02]">
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:items-center">
        <div className={flip ? "lg:order-2" : ""}>
          <ProjectVisual visual={project.visual} />
        </div>
        <div className={flip ? "lg:order-1" : ""}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-xl font-bold text-zinc-50">{project.name}</h3>
            {project.headlineStat && (
              <span
                className={`font-mono text-[11px] ${project.headlineStat === "team of 5" ? "text-zinc-500" : "text-accent"}`}
              >
                {project.headlineStat}
              </span>
            )}
          </div>
          <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-400">{project.blurb}</p>
          <Bullets items={project.bullets} />
          {project.ownership && (
            <p className="mt-2 flex gap-2.5 text-[13px] text-zinc-500">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
              <span>{project.ownership}</span>
            </p>
          )}
          <div className="mt-4">
            <LogoRow slugs={project.logos} />
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function SmallCard({ project }: { project: Project }) {
  return (
    <article className="reveal glow flex flex-col overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.02]">
      <div className="m-5 mb-0">
        <ProjectVisual visual={project.visual} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-zinc-50">{project.name}</h3>
          {project.badge && (
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
              {project.badge}
            </span>
          )}
        </div>
        <p className={`mt-2 text-[13.5px] leading-relaxed text-zinc-400 ${project.bullets.length ? "" : "flex-1"}`}>
          {project.blurb}
        </p>
        {project.bullets.length > 0 && (
          <div className="flex-1">
            <Bullets items={project.bullets} />
          </div>
        )}
        <div className="mt-4">
          <LogoRow slugs={project.logos} />
        </div>
        {project.links.github ? (
          <ExternalLink
            href={project.links.github}
            className="mt-4 text-sm font-medium text-zinc-400 link-underline hover:text-zinc-100"
          >
            GitHub ↗
          </ExternalLink>
        ) : (
          <span className="mt-4 font-mono text-[11px] text-zinc-600">repo publishing soon</span>
        )}
      </div>
    </article>
  );
}

export function Work() {
  return (
    <>
      <Flagship project={flagship} />
      {featured.map((p, i) => (
        <FeaturedRow key={p.slug} project={p} flip={i % 2 === 0} />
      ))}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {secondary.map((p) => (
          <SmallCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
