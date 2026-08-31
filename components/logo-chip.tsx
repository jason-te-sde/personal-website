import { LOGO_LABEL } from "@/content/stack";

/**
 * Brand marks come from the Simple Icons CDN in their own colours. Kept as plain
 * <img> rather than next/image: they are remote, tiny, and next/image would need
 * every host allow-listed for no benefit at 13px.
 */
export function LogoChip({ slug }: { slug: string }) {
  return (
    <span className="logo-chip flex items-center gap-1.5 rounded-lg border border-white/[.07] bg-white/[.02] px-2 py-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="logo"
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        width={13}
        height={13}
        loading="lazy"
      />
      <span className="font-mono text-[10.5px] text-zinc-400">{LOGO_LABEL[slug] ?? slug}</span>
    </span>
  );
}

export function TextChip({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-white/[.07] bg-white/[.02] px-2 py-1 font-mono text-[10.5px] text-zinc-400">
      {label}
    </span>
  );
}

export function LogoRow({ slugs }: { slugs: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {slugs.map((s) => (
        <LogoChip key={s} slug={s} />
      ))}
    </div>
  );
}
