"use client";

import { useEffect, useRef } from "react";

/**
 * A five-node Raft cluster with real quorum arithmetic. Autoplays leader election,
 * heartbeats, a leader crash and re-election; click a node to crash it. Crash three
 * of five and it stops electing and says so, because 3 is the quorum of 5.
 *
 * Driven imperatively inside one effect rather than through React state — this is a
 * 60fps animation loop, and re-rendering the tree per frame would buy nothing.
 */
const CX = 150;
const CY = 105;
const R = 80;
const NR = 20;

type NodeState = "leader" | "follower" | "candidate" | "crashed";

export function RaftCluster() {
  const svgRef = useRef<SVGSVGElement>(null);
  const edgesRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const packetsRef = useRef<SVGGElement>(null);
  const termRef = useRef<HTMLSpanElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const killRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const gEdges = edgesRef.current;
    const gNodes = nodesRef.current;
    const gPackets = packetsRef.current;
    const elTerm = termRef.current;
    const elLog = logRef.current;
    const killBtn = killRef.current;
    if (!svg || !gEdges || !gNodes || !gPackets || !elTerm || !elLog || !killBtn) return;

    const NODES = [0, 1, 2, 3, 4].map((i) => {
      const a = ((-90 + i * 72) * Math.PI) / 180;
      return { id: i + 1, x: +(CX + R * Math.cos(a)).toFixed(1), y: +(CY + R * Math.sin(a)).toFixed(1) };
    });
    const byId = (id: number) => NODES.find((n) => n.id === id)!;

    const state: Record<number, NodeState> = {};
    NODES.forEach((n) => (state[n.id] = "follower"));
    let term = 1;
    let leader = 2;
    let commit = 41;
    let rounds = 0;
    let offscreen = false;
    let cancelled = false;
    state[leader] = "leader";

    const live = () => NODES.filter((n) => state[n.id] !== "crashed");
    const quorum = () => Math.floor(NODES.length / 2) + 1;
    const hasQuorum = () => live().length >= quorum();
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    function log(text: string, cls = "text-zinc-500") {
      const d = document.createElement("div");
      d.className = `${cls} whitespace-pre`;
      d.textContent = text;
      elLog!.appendChild(d);
      while (elLog!.children.length > 4) elLog!.removeChild(elLog!.firstChild!);
    }

    function render() {
      const l = state[leader] === "leader" ? byId(leader) : null;
      gEdges!.innerHTML = !l
        ? ""
        : live()
            .filter((n) => n.id !== leader)
            .map(
              (n) =>
                `<line x1="${l.x}" y1="${l.y}" x2="${n.x}" y2="${n.y}" stroke="#A855F7" stroke-width="1" stroke-opacity=".16"/>`,
            )
            .join("");

      gNodes!.innerHTML = NODES.map((n) => {
        const st = state[n.id];
        const down = st === "crashed";
        const lead = st === "leader";
        const cand = st === "candidate";
        const stroke = down ? "#3f3f46" : lead ? "#A855F7" : cand ? "#fbbf24" : "#52525b";
        const fill = down
          ? "#0a0a0e"
          : lead
            ? "rgba(168,85,247,.15)"
            : cand
              ? "rgba(251,191,36,.12)"
              : "rgba(255,255,255,.035)";
        const role = down ? "down" : lead ? "LEADER" : cand ? "cand" : "follower";
        const roleCol = down ? "#52525b" : lead ? "#A855F7" : cand ? "#fbbf24" : "#71717a";
        return `
          ${lead ? `<circle class="leader-pulse" cx="${n.x}" cy="${n.y}" r="30" fill="none" stroke="#A855F7" stroke-width="1"/>` : ""}
          <circle cx="${n.x}" cy="${n.y}" r="${NR}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" ${down ? 'stroke-dasharray="3 3"' : ""}/>
          <text x="${n.x}" y="${n.y - 1}" text-anchor="middle" font-size="10" font-weight="700" font-family="'JetBrains Mono',monospace" fill="${down ? "#52525b" : "#e4e4e7"}">n${n.id}</text>
          <text x="${n.x}" y="${n.y + 9}" text-anchor="middle" font-size="7" font-family="'JetBrains Mono',monospace" fill="${roleCol}">${role}</text>
          <circle cx="${n.x}" cy="${n.y}" r="${NR + 4}" fill="transparent" style="cursor:pointer" data-node="${n.id}"/>`;
      }).join("");

      if (!hasQuorum()) {
        gEdges!.insertAdjacentHTML(
          "beforeend",
          `<text x="${CX}" y="${CY + 4}" text-anchor="middle" font-size="8.5" font-weight="700" font-family="'JetBrains Mono',monospace" fill="#f87171">NO QUORUM</text>
           <text x="${CX}" y="${CY + 15}" text-anchor="middle" font-size="7" font-family="'JetBrains Mono',monospace" fill="#71717a">writes blocked</text>`,
        );
      }
    }

    type Packet = { from: { x: number; y: number }; to: { x: number; y: number }; color: string; dur: number; t0: number; onArrive?: () => void };
    const packets: Packet[] = [];
    const send = (from: Packet["from"], to: Packet["to"], color: string, dur: number, onArrive?: () => void) =>
      packets.push({ from, to, color, dur, t0: performance.now(), onArrive });

    let raf = 0;
    function frame(now: number) {
      let out = "";
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const t = Math.min((now - p.t0) / p.dur, 1);
        const x = p.from.x + (p.to.x - p.from.x) * t;
        const y = p.from.y + (p.to.y - p.from.y) * t;
        out += `<circle cx="${x}" cy="${y}" r="6" fill="${p.color}" opacity=".18"/><circle cx="${x}" cy="${y}" r="2.6" fill="${p.color}"/>`;
        if (t >= 1) {
          packets.splice(i, 1);
          p.onArrive?.();
        }
      }
      gPackets!.innerHTML = out;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const timers: number[] = [];

    async function heartbeat() {
      const l = byId(leader);
      const followers = live().filter((n) => n.id !== leader);
      followers.forEach((n, i) => timers.push(window.setTimeout(() => send(l, n, "#A855F7", 520), i * 55)));
      await sleep(760);
      if (hasQuorum()) {
        commit++;
        log(`leader=n${leader} term=${term}  appended idx=${commit}  (${live().length}/5 matched)`);
      }
      await sleep(520);
      rounds++;
    }

    async function election() {
      const candidates = live();
      if (!candidates.length) return sleep(1200);
      if (!hasQuorum()) {
        log(`election timeout — only ${candidates.length}/5 up, quorum is ${quorum()}`, "text-red-400/70");
        await sleep(1600);
        return;
      }
      const c = candidates[Math.floor(Math.random() * candidates.length)];
      term++;
      state[c.id] = "candidate";
      elTerm!.textContent = String(term);
      elTerm!.classList.remove("term-flash");
      void elTerm!.offsetWidth;
      elTerm!.classList.add("term-flash");
      log(`n${c.id} → candidate  term=${term}  requesting votes`, "text-amber-300/80");
      render();
      await sleep(360);

      const voters = live().filter((n) => n.id !== c.id);
      let votes = 1;
      voters.forEach((n, i) =>
        timers.push(
          window.setTimeout(() => {
            send(c, n, "#fbbf24", 380, () =>
              send(n, c, "#34d399", 380, () => {
                votes++;
                if (votes === quorum()) log(`n${c.id} ← ${votes}/5 votes, quorum reached`, "text-emerald-400/80");
              }),
            );
          }, i * 70),
        ),
      );

      await sleep(1250);
      leader = c.id;
      NODES.forEach((n) => {
        if (state[n.id] !== "crashed") state[n.id] = "follower";
      });
      state[leader] = "leader";
      log(`n${leader} = LEADER  term=${term}  elected in ${380 + Math.floor(Math.random() * 90)}ms`, "text-accent");
      render();
      rounds = 0;
      await sleep(700);
    }

    function crash(id: number) {
      if (state[id] === "crashed") return;
      const wasLeader = id === leader;
      state[id] = "crashed";
      log(`n${id} ✗ crashed${wasLeader ? "  (was leader)" : ""}`, "text-red-400/80");
      render();
      timers.push(
        window.setTimeout(
          () => {
            if (state[id] !== "crashed") return;
            state[id] = "follower";
            log(`n${id} ✓ rejoined  catching up from idx=${Math.max(1, commit - 6)}`, "text-emerald-400/70");
            render();
          },
          7000 + Math.random() * 3000,
        ),
      );
    }

    const onClick = (e: Event) => {
      const id = (e.target as SVGElement).getAttribute?.("data-node");
      if (id) crash(+id);
    };
    const onKill = () => crash(leader);
    svg.addEventListener("click", onClick);
    killBtn.addEventListener("click", onKill);

    const vis = new IntersectionObserver((es) => (offscreen = !es[0].isIntersecting), { threshold: 0 });
    vis.observe(svg);

    render();
    log("cluster up — 5 nodes, quorum 3", "text-zinc-600");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      void (async function main() {
        await sleep(700);
        while (!cancelled) {
          if (offscreen) {
            await sleep(400);
            continue;
          }
          if (state[leader] !== "leader") await election();
          else {
            await heartbeat();
            if (rounds >= 4) crash(leader);
          }
        }
      })();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      vis.disconnect();
      svg.removeEventListener("click", onClick);
      killBtn.removeEventListener("click", onKill);
    };
  }, []);

  return (
    <div className="glow rounded-2xl border border-white/10 bg-white/[.02] p-5 md:col-span-2 md:row-span-2">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#A855F7]" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">keel · live cluster</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500">
          term{" "}
          <span ref={termRef} className="font-bold text-zinc-200">
            1
          </span>
        </span>
      </div>

      <svg
        ref={svgRef}
        viewBox="-22 -22 344 240"
        className="mt-1 w-full"
        role="img"
        aria-label="Animated five-node Raft cluster electing a leader, surviving a crash, and re-electing"
      >
        <g ref={edgesRef} />
        <g ref={packetsRef} />
        <g ref={nodesRef} />
      </svg>

      <div className="rounded-lg border border-white/[.07] bg-black/40 p-3 font-mono">
        <div
          ref={logRef}
          className="h-[76px] overflow-hidden text-[10px] leading-[1.5] text-zinc-500 sm:text-[11px] sm:leading-relaxed"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          ref={killRef}
          type="button"
          className="rounded-lg border border-red-500/25 bg-red-500/[.07] px-3 py-1.5 font-mono text-[11px] font-medium text-red-300 transition hover:border-red-500/50 hover:bg-red-500/15"
        >
          kill -9 leader
        </button>
        <span className="font-mono text-[11px] text-zinc-600">click a node to crash it</span>
      </div>
    </div>
  );
}
