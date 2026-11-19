import type { ReactNode } from "react";
import type { Block } from "@/content/types";
import { ExternalLink } from "./section";

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

/** Article text: **bold**, `code` and [a link](https://…). Like RichText, nothing else on purpose. */
export function Inline({ children }: { children: string }): ReactNode {
  return children.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-white/[.05] px-1 py-0.5 font-mono text-[0.88em] text-zinc-300">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      return (
        <ExternalLink key={i} href={link[2]} className="text-accent link-underline">
          {link[1]}
        </ExternalLink>
      );
    }
    return part;
  });
}

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[15.5px] leading-[1.75] text-zinc-400">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h2":
            return (
              <h2 key={i} className="pt-6 text-xl font-bold tracking-tight text-zinc-100">
                <Inline>{block.text}</Inline>
              </h2>
            );
          case "p":
            return (
              <p key={i}>
                <Inline>{block.text}</Inline>
              </p>
            );
          case "list":
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 marker:text-zinc-600">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline>{item}</Inline>
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-white/[.08] bg-white/[.02] p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300"
              >
                <code>{block.text}</code>
              </pre>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-white/[.1]">
                      {block.head.map((cell, j) => (
                        <th key={j} className="py-2 pr-4 font-semibold text-zinc-200">
                          <Inline>{cell}</Inline>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-white/[.06]">
                        {row.map((cell, k) => (
                          <td key={k} className="py-2 pr-4 align-top">
                            <Inline>{cell}</Inline>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
