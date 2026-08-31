"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `to` the first time it scrolls into view.
 *
 * Renders the final value server-side and animates by writing textContent through
 * a ref — no React state. That keeps the true number in the HTML (so it is correct
 * with JS disabled and for crawlers) and avoids a setState per animation frame.
 */
export function CountUp({ to, duration = 1300 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        el.textContent = "0";
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(to);
    };
  }, [to, duration]);

  return <span ref={ref}>{to}</span>;
}
