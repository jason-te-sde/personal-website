import Link from "next/link";
import { articles } from "@/content/writing";

export function WritingList() {
  return (
    <div className="mt-8 divide-y divide-white/[.06] border-y border-white/[.06]">
      {articles.map((a) => (
        <Link key={a.slug} href={`/writing/${a.slug}`} className="reveal group block py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[16px] font-semibold text-zinc-100 transition group-hover:text-accent">{a.title}</h3>
            <span className="font-mono text-[11px] text-zinc-600">
              {a.project.name} · {a.date}
            </span>
          </div>
          <p className="mt-1.5 text-[14px] leading-relaxed text-zinc-500">{a.summary}</p>
        </Link>
      ))}
    </div>
  );
}
