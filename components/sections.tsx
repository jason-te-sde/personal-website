import { experience } from "@/content/experience";
import { stack } from "@/content/stack";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { LogoChip, LogoRow, TextChip } from "./logo-chip";
import { RichText } from "./rich-text";

export function ExperienceList() {
  return (
    <div className="mt-8 space-y-4">
      {experience.map((job) => (
        <article key={job.slug} className="reveal glow rounded-2xl border border-white/[.08] bg-white/[.02] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border bg-gradient-to-br font-mono text-sm font-bold ${job.markClass}`}
              >
                {job.mark}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-zinc-100">{job.role}</h3>
                <div className="text-[13.5px] text-zinc-400">{job.company}</div>
              </div>
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              {job.dates} · {job.location}
            </span>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-zinc-400">{job.summary}</p>

          <ul className="mt-3 space-y-2 text-[13.5px] text-zinc-400">
            {job.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span
                  className={`mt-[8px] h-1 w-1 shrink-0 rounded-full ${job.slug === "onye" ? "bg-accent" : "bg-zinc-600"}`}
                />
                <span>
                  <RichText>{b}</RichText>
                </span>
              </li>
            ))}
          </ul>

          {job.note && (
            <p className="mt-3.5 rounded-lg border-l-2 border-accent/40 bg-white/[.02] px-3.5 py-2.5 text-[12px] leading-relaxed text-zinc-500">
              <RichText>{job.note}</RichText>
            </p>
          )}

          <div className="mt-4">
            <LogoRow slugs={job.logos} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function StackGrid() {
  return (
    <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
      {stack.map((group) => (
        <div
          key={group.label}
          className={`glow rounded-2xl border border-white/[.08] bg-white/[.02] p-5 ${group.wide ? "sm:col-span-2" : ""}`}
        >
          <div className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500">
            {group.label}
          </div>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {group.logos.map((s) => (
              <LogoChip key={s} slug={s} />
            ))}
            {group.text.map((t) => (
              <TextChip key={t} label={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EducationList() {
  return (
    <div className="reveal mt-8 grid gap-4 md:grid-cols-3">
      {education.map((e) => (
        <div
          key={e.school}
          className={`glow rounded-2xl p-5 ${
            e.current
              ? "border border-accent/20 bg-gradient-to-b from-accent/[.07] to-transparent"
              : "border border-white/[.08] bg-white/[.02]"
          }`}
        >
          <div
            className={`font-mono text-[10px] uppercase tracking-wider ${e.current ? "text-accent" : "text-zinc-600"}`}
          >
            {e.kicker}
          </div>
          <div className="mt-2.5 font-semibold text-zinc-100">{e.school}</div>
          <div className="mt-0.5 text-[13px] text-zinc-400">{e.degree}</div>
          <div className="mt-3 flex items-baseline justify-between font-mono text-[11px]">
            <span className={e.gpa ? "text-accent" : "text-zinc-600"}>{e.gpa ?? e.place}</span>
            <span className="text-zinc-500">{e.dates}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Contact() {
  return (
    <section className="reveal pt-8 pb-14">
      <div className="glow overflow-hidden rounded-2xl border border-white/10 bg-white/[.02] p-8 text-center sm:p-12">
        <div className="grad-rule mx-auto mb-7 h-px w-24" />
        <h2 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
          Hiring for backend or infrastructure?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] leading-relaxed text-zinc-400">
          I graduate in May 2027 and I read every email. The fastest way to judge me is to clone keel and run the
          simulator yourself.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="grad-btn rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-700/30"
          >
            {profile.email}
          </a>
          {profile.resumePath && (
            <a
              href={profile.resumePath}
              className="rounded-xl border border-white/10 bg-white/[.03] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-accent/40"
            >
              Resume ↓
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
