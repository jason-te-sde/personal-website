import type { ReactNode } from "react";

/**
 * Bullets in content/ mark their one or two key terms with **double asterisks**.
 * Full Markdown would mean a parser and a plugin chain for this alone.
 */
export function RichText({ children }: { children: string }): ReactNode {
  return children.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-zinc-200">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}
