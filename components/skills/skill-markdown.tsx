import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type SkillMarkdownProps = {
  markdown: string;
};

export function SkillMarkdown({ markdown }: SkillMarkdownProps) {
  return (
    <div className="skill-markdown text-[13px] leading-relaxed text-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-6 mb-3 font-mono text-base font-semibold text-foreground first:mt-0">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="mt-6 mb-2 font-mono text-sm font-semibold text-foreground first:mt-0">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-4 mb-2 text-[13px] font-semibold text-foreground first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return (
                <code className="font-mono text-[12px] text-foreground">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded border border-border bg-surface-raised px-1 py-0.5 font-mono text-[12px] text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mb-3 overflow-x-auto rounded-md border border-border bg-surface-raised p-3 last:mb-0">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-3 border-l-2 border-border pl-3 text-muted-dim last:mb-0">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-border" />,
          table: ({ children }) => (
            <div className="mb-3 overflow-x-auto last:mb-0">
              <table className="w-full min-w-full border-collapse text-left">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-raised">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-border last:border-b-0">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-2 py-1.5 font-mono text-[11px] font-medium text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-2 py-1.5 align-top">{children}</td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
