"use client";

import { useEffect } from "react";

/**
 * All the page-level motion in one client component: scroll-reveal, the cursor
 * spotlight on cards, the scroll progress bar, and nav scroll-spy. Mounted once
 * in the layout so the rest of the tree stays server-rendered.
 */
export function MotionFx() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // reveal on scroll
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduced) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const revObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (!e.isIntersecting) return;
            const el = e.target as HTMLElement;
            window.setTimeout(() => el.classList.add("in"), i * 70);
            revObs.unobserve(el);
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      reveals.forEach((el) => revObs.observe(el));
      cleanups.push(() => revObs.disconnect());
    }

    // cursor spotlight
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".glow");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    cleanups.push(() => document.removeEventListener("pointermove", onMove));

    // scroll progress
    const bar = document.getElementById("progress");
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // nav scroll-spy
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
    const spyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("nav-active", a.hash === `#${e.target.id}`));
        });
      },
      { threshold: 0.15, rootMargin: "-20% 0px -60% 0px" },
    );
    ["work", "experience", "stack"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spyObs.observe(el);
    });
    cleanups.push(() => spyObs.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
