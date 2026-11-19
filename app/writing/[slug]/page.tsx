import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/content/writing";
import { Prose } from "@/components/prose";
import { ExternalLink } from "@/components/section";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.summary, publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 pb-20">
      <div className="pt-12">
        <Link href="/#writing" className="font-mono text-[11px] text-zinc-500 transition hover:text-zinc-300">
          ← Jason Te
        </Link>
      </div>

      <article>
        <header className="pt-8">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-zinc-600">
            <time dateTime={article.date}>{article.date}</time>
            <span>·</span>
            <ExternalLink href={article.project.github} className="link-underline hover:text-zinc-300">
              {article.project.name} ↗
            </ExternalLink>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300">{article.summary}</p>
        </header>

        <div className="pt-8">
          <Prose blocks={article.blocks} />
        </div>
      </article>

      <div className="mt-14 border-t border-white/[.06] pt-6 text-sm">
        <Link href="/#writing" className="text-zinc-400 link-underline hover:text-zinc-100">
          ← All writing
        </Link>
      </div>
    </main>
  );
}
