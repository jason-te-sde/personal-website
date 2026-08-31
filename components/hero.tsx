import Image from "next/image";
import { profile, stats } from "@/content/profile";
import { CountUp } from "./client/count-up";
import { RaftCluster } from "./client/raft-cluster";
import { ExternalLink, LinkedInIcon } from "./section";

export function Hero() {
  const h = profile.headshot;
  return (
    <section className="grid items-center gap-10 pt-14 pb-12 md:grid-cols-[260px_1fr] md:gap-12 lg:pt-20">
      <div className="reveal mx-auto w-[240px] md:mx-0 md:w-full">
        <div className="rotate-[-1.5deg] rounded-2xl border border-white/[.09] bg-gradient-to-b from-white/[.07] to-white/[.02] p-3 shadow-2xl shadow-black/60 backdrop-blur transition hover:rotate-0">
          <Image
            src={h.src}
            alt={h.alt}
            width={h.width}
            height={h.height}
            priority
            className="h-[280px] w-full rounded-xl object-cover object-top ring-1 ring-white/10"
          />
          <div className="flex items-center justify-between px-1 pt-2.5 font-mono text-[10.5px]">
            <span className="text-zinc-300">{profile.name}</span>
            <span className="text-accent">#Seattle</span>
          </div>
        </div>
      </div>

      <div className="reveal">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-xs text-zinc-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </div>

        <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-zinc-50 sm:text-5xl">
          {profile.headlineTop}
          <br />
          <span className="grad-text">{profile.headlineAccent}</span>
        </h1>

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-400">{profile.intro}</p>
        <p className="mt-3.5 max-w-xl border-l-2 border-accent/40 pl-3.5 text-[15px] leading-relaxed text-zinc-300">
          {profile.pullQuote}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={profile.resumePath ?? `mailto:${profile.email}`}
            className="grad-btn group relative overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-700/30"
          >
            <span className="relative z-10">{profile.resumePath ? "Resume ↓" : "Email me"}</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
          </a>
          <ExternalLink
            href={profile.github}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-accent/40 hover:bg-accent/[.07]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://cdn.simpleicons.org/github/e4e4e7" alt="" width={15} height={15} className="opacity-80" />
            GitHub
          </ExternalLink>
          <ExternalLink
            href={profile.linkedin}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-accent/40 hover:bg-accent/[.07]"
          >
            <LinkedInIcon className="opacity-80" />
            LinkedIn
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}

export function Bento() {
  return (
    <section className="reveal pb-6">
      <div className="grid gap-4 md:grid-cols-3">
        <RaftCluster />

        <div className="glow flex flex-col rounded-2xl border border-white/10 bg-white/[.02] p-5">
          <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">Measured</div>
          <div className="mt-4 flex flex-1 flex-col justify-around gap-3">
            {stats.map((s) => (
              <ExternalLink key={s.label} href={s.source} className="group block">
                <div className="font-mono text-2xl font-bold leading-none text-zinc-50">
                  <CountUp to={s.count} />
                  <span className={s.suffix === "×" ? "text-accent" : "text-base font-medium text-zinc-400"}>
                    {s.suffix}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-zinc-400">{s.label}</div>
              </ExternalLink>
            ))}
          </div>
        </div>

        <div className="glow flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[.02] p-5">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">Now</div>
            <div className="mt-3 text-[15px] font-semibold text-zinc-100">MS Computer Science</div>
            <div className="text-[13px] text-zinc-400">Northeastern University</div>
            <div className="mt-1.5 font-mono text-[11px] text-accent">GPA 4.0 · May 2027</div>
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-white/[.06] pt-3.5 font-mono text-[11px] text-zinc-500">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.2" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.4" />
            </svg>
            {profile.location}
          </div>
        </div>
      </div>
    </section>
  );
}
