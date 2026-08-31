import type { Metadata } from "next";
import Link from "next/link";
import { bugs, numbers, throughput } from "@/content/keel-case-study";
import { TypingTerminal } from "@/components/client/typing-terminal";
import { LogoRow } from "@/components/logo-chip";
import { ExternalLink } from "@/components/section";

export const metadata: Metadata = {
  title: "keel — a linearizable distributed key-value store",
  description:
    "Raft written from scratch as a pure state machine, a seeded fault-injection simulator that found three safety violations, and a linearizability checker.",
  alternates: { canonical: "/projects/keel" },
};

const MAX = Math.max(...throughput.map((t) => t.value));

export default function KeelCaseStudy() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-20">
      <div className="pt-12">
        <Link href="/" className="font-mono text-[11px] text-zinc-500 transition hover:text-zinc-300">
          ← Jason Te
        </Link>
      </div>

      <header className="reveal pt-8">
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            Case study
          </span>
          <span className="font-mono text-[11px] text-zinc-600">v0.3.1 · MIT · Java</span>
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-50">keel</h1>
        <p className="mt-3 text-lg text-zinc-300">A linearizable distributed key-value store.</p>
        <p className="mt-5 text-[15px] leading-relaxed text-zinc-400">
          Most Raft projects prove they work by starting a cluster and watching it not fall over. This one asserts
          every safety property in the paper after <em className="not-italic font-medium text-zinc-200">every step</em>{" "}
          of a seeded simulation, then checks that what clients actually observed could have happened in some
          sequential order at all.
        </p>
        <div className="mt-6">
          <LogoRow slugs={["openjdk", "docker", "prometheus", "rocksdb"]} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <ExternalLink href="https://github.com/jason-te-sde/keel" className="text-accent link-underline">
            GitHub ↗
          </ExternalLink>
          <ExternalLink
            href="https://jason-te-sde.github.io/keel/"
            className="text-zinc-400 link-underline hover:text-zinc-100"
          >
            Javadoc ↗
          </ExternalLink>
        </div>
      </header>

      {/* it runs */}
      <section className="reveal pt-14">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">It runs</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
          Three nodes, health-checked, from one <code className="font-mono text-[13px] text-zinc-300">docker compose</code>{" "}
          command. Kill the leader and a follower takes over without losing the write.
        </p>
        <div className="mt-6">
          <TypingTerminal />
        </div>
      </section>

      {/* the 60x */}
      <section className="reveal pt-14">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Why the core hands back a batch
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
          An acknowledgement is a promise of durability, and a leader counts acknowledgements toward a quorum — so the
          log must be synced before a message goes out. A durable write costs about 3ms on this hardware, which makes
          the difference between one fsync per entry and one per batch the single largest number in the project.
        </p>

        <div className="mt-7 space-y-3.5">
          {throughput.map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={`text-[13px] ${row.emphasis ? "font-medium text-zinc-200" : "text-zinc-500"}`}>
                  {row.label}
                </span>
                <span
                  className={`font-mono text-[13px] ${row.emphasis ? "font-bold text-accent" : "text-zinc-500"}`}
                >
                  {row.value.toLocaleString()} entries/s
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/[.04]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max((row.value / MAX) * 100, 0.4)}%`,
                    background: row.emphasis ? "#A855F7" : "#71717A",
                  }}
                />
              </div>
              <div className="mt-1 font-mono text-[10.5px] text-zinc-600">{row.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-zinc-500">
          Batching a whole <code className="font-mono text-zinc-400">Ready</code> into one fsync is worth roughly{" "}
          <strong className="font-semibold text-zinc-300">60×</strong>. The unsynced figure moves by a factor of two
          between runs on a laptop, which is worth saying rather than quietly picking the best one — and it is not
          durable, so it is not a result.
        </p>
      </section>

      {/* bugs */}
      <section className="reveal pt-14">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Three bugs hand-written tests could not reach
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
          The consensus core is a pure state machine — no threads, no clock, no I/O, no locks — so a whole cluster&apos;s
          behaviour, including message latency, partitions and crashes, is a function of one integer seed. A bug found
          at seed 8123 is still there at seed 8123 tomorrow. These three are safety violations, not crashes: the
          cluster kept serving while quietly breaking a promise.
        </p>
        <div className="mt-7 space-y-4">
          {bugs.map((bug) => (
            <article key={bug.seed} className="glow rounded-xl border border-white/[.08] bg-white/[.02] p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[15px] font-semibold text-zinc-100">{bug.title}</h3>
                <span className="shrink-0 rounded-md border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                  {bug.seed}
                </span>
              </div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-400">{bug.body}</p>
              <p className="mt-3 border-t border-white/[.06] pt-2.5 font-mono text-[11px] leading-relaxed text-zinc-500">
                caught by: {bug.caught}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* numbers */}
      <section className="reveal pt-14">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Numbers</h2>
        <p className="mt-4 text-[13px] text-zinc-500">
          Measured on an Apple M-series laptop, APFS. Every figure in the repo carries the command that produced it.
        </p>
        <dl className="mt-6 divide-y divide-white/[.06] border-y border-white/[.06]">
          {numbers.map(([k, v]) => (
            <div key={k} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
              <dt className="text-[13.5px] text-zinc-400">{k}</dt>
              <dd className="font-mono text-[13px] text-zinc-200">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="reveal pt-14">
        <div className="glow rounded-2xl border border-white/10 bg-white/[.02] p-6 text-center">
          <p className="text-[15px] text-zinc-300">The fastest way to judge this is to run the simulator yourself.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <ExternalLink
              href="https://github.com/jason-te-sde/keel"
              className="grad-btn rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-700/30"
            >
              Clone keel ↗
            </ExternalLink>
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-white/[.03] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-accent/40"
            >
              ← Back to the site
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
