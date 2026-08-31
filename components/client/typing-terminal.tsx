"use client";

import { useEffect, useRef } from "react";

/** The real `keelctl` failover transcript, typed out on first scroll into view. */
const LINES: ReadonlyArray<readonly [string, string]> = [
  ["$ docker compose up -d --wait", "text-zinc-300"],
  ["  ✔ node-1   ✔ node-2   ✔ node-3", "text-emerald-400/80"],
  ["", ""],
  ["$ keelctl status", "text-zinc-300"],
  ["node 1  FOLLOWER  term=1  leader=2", "text-zinc-500"],
  ["node 2  LEADER    term=1  leader=2", "text-accent"],
  ["node 3  FOLLOWER  term=1  leader=2", "text-zinc-500"],
  ["", ""],
  ["$ keelctl put greeting hello", "text-zinc-300"],
  ["ok", "text-emerald-400/80"],
  ["", ""],
  ["$ kill -9 <node 2>", "text-red-400/80"],
  ["$ keelctl status", "text-zinc-300"],
  ["node 3  LEADER    term=2  leader=3", "text-accent"],
  ["", ""],
  ["$ keelctl get greeting", "text-zinc-300"],
  ["hello", "text-emerald-400/80"],
];

export function TypingTerminal() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = ref.current;
    if (!pre) return;
    let cancelled = false;
    const timers: number[] = [];

    const renderAll = () => {
      pre.innerHTML = "";
      LINES.forEach(([text, cls]) => {
        const div = document.createElement("div");
        div.className = cls;
        if (text) div.textContent = text;
        else div.innerHTML = "&nbsp;";
        pre.appendChild(div);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      renderAll();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        let li = 0;
        const nextLine = () => {
          if (cancelled) return;
          if (li >= LINES.length) {
            const caret = document.createElement("span");
            caret.className = "caret text-accent";
            caret.textContent = "▌";
            pre.appendChild(caret);
            return;
          }
          const [text, cls] = LINES[li++];
          const div = document.createElement("div");
          div.className = cls;
          div.innerHTML = "&nbsp;";
          pre.appendChild(div);
          if (!text) {
            timers.push(window.setTimeout(nextLine, 90));
            return;
          }
          const isPrompt = text.startsWith("$");
          let ci = 0;
          const typeChar = () => {
            if (cancelled) return;
            div.textContent = text.slice(0, ++ci);
            timers.push(
              window.setTimeout(
                ci < text.length ? typeChar : nextLine,
                ci < text.length ? (isPrompt ? 26 : 7) : isPrompt ? 260 : 60,
              ),
            );
          };
          typeChar();
        };
        nextLine();
      },
      { threshold: 0.3 },
    );
    obs.observe(pre);

    return () => {
      cancelled = true;
      obs.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-white/[.08] bg-black/50">
      <div className="flex items-center gap-1.5 border-b border-white/[.06] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10px] text-zinc-600">keelctl — leader failover</span>
      </div>
      <pre
        ref={ref}
        className="h-[326px] overflow-hidden whitespace-pre-wrap p-3.5 font-mono text-[11px] leading-[1.65] text-zinc-400"
      />
    </div>
  );
}
