import Link from "next/link";
import { profile } from "@/content/profile";
import { ExternalLink } from "./section";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[.06] bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grad-btn grid h-7 w-7 place-items-center rounded-lg font-mono text-xs font-bold text-white shadow-lg shadow-brand-700/40">
            JT
          </span>
          <span className="font-semibold tracking-tight text-zinc-100">{profile.name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {[
            ["#work", "Work", ""],
            ["#experience", "Experience", "hidden sm:flex"],
            ["#stack", "Stack", "hidden sm:flex"],
          ].map(([href, label, cls]) => (
            <a
              key={href}
              href={href}
              data-nav
              className={`${cls || "flex"} items-center gap-2 rounded-lg px-3 py-1.5 text-zinc-500 transition hover:text-zinc-200`}
            >
              <span className="nav-dot h-1 w-1 rounded-full bg-zinc-700" />
              {label}
            </a>
          ))}
          <a
            href={profile.resumePath ?? `mailto:${profile.email}`}
            className="ml-2 rounded-lg border border-white/10 bg-white/[.04] px-3 py-1.5 font-medium text-zinc-200 transition hover:border-accent/40 hover:bg-accent/10"
          >
            {profile.resumePath ? "Resume ↓" : "Email"}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[.06]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <span className="font-mono text-[11px] text-zinc-600">
          {profile.name} · {profile.location} · © 2026
        </span>
        <div className="flex gap-5 text-[13px]">
          <ExternalLink href={profile.github} className="text-zinc-500 link-underline hover:text-zinc-200">
            GitHub
          </ExternalLink>
          <ExternalLink href={profile.linkedin} className="text-zinc-500 link-underline hover:text-zinc-200">
            LinkedIn
          </ExternalLink>
          <a href={`mailto:${profile.email}`} className="text-zinc-500 link-underline hover:text-zinc-200">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Backdrop() {
  return (
    <>
      <div id="progress" />
      <div className="bg-layer" aria-hidden="true">
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
        <div className="grid-lines" />
        <div className="grain" />
      </div>
    </>
  );
}
