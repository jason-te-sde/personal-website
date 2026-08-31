import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50">No page at this address.</h1>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-400">
        The link may be stale. Everything on this site is reachable from the front page.
      </p>
      <Link
        href="/"
        className="grad-btn mt-8 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-700/30"
      >
        Back to the start
      </Link>
    </main>
  );
}
