import type { ReactNode } from "react";

/** The only place container width and section rhythm are decided. */
export function Section({
  id,
  index,
  title,
  children,
}: {
  id?: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="pt-8 pb-14">
      <div className="reveal flex items-center gap-4">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {index} &nbsp;/&nbsp; {title}
        </h2>
        <div className="grad-rule h-px flex-1 opacity-40" />
      </div>
      {children}
    </section>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function LinkedInIcon({ className = "" }: { className?: string }) {
  // Simple Icons dropped LinkedIn's mark, so it is inlined.
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
