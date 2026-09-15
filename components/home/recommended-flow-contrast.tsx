"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { recommendedFlow } from "@/lib/home-data";

function ContrastPill({
  children,
  tone,
  index,
  visible,
}: {
  children: string;
  tone: "danger" | "accent";
  index: number;
  visible: boolean;
}) {
  const toneClass =
    tone === "danger"
      ? "bg-danger-soft text-danger"
      : "bg-accent-soft text-accent";

  return (
    <li
      className={`flow-pill flex min-h-16 items-center rounded-md px-2.5 py-3 font-mono text-sm ${toneClass}${
        visible ? " flow-pill-visible" : ""
      }`}
      style={{ "--flow-pill-delay": `${index * 90}ms` } as CSSProperties}
    >
      {children}
    </li>
  );
}

export function RecommendedFlowContrast() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { filesVsChat } = recommendedFlow;

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid gap-8 lg:grid-cols-2 lg:items-stretch"
    >
      <article className="flex h-full flex-col gap-2.5 rounded-lg border border-border bg-surface p-6 sm:p-8">
        <h4 className="pb-1 font-mono text-xs uppercase tracking-wider text-danger">
          {filesVsChat.chat.title}
        </h4>
        <ul className="flex flex-col gap-2.5">
          {filesVsChat.chat.lines.map((line, index) => (
            <ContrastPill
              key={line.from}
              tone="danger"
              index={index}
              visible={visible}
            >
              {`${line.from} → ${line.to}`}
            </ContrastPill>
          ))}
        </ul>
      </article>
      <article className="flex h-full flex-col gap-2.5 rounded-lg border border-border bg-surface p-6 sm:p-8">
        <h4 className="pb-1 font-mono text-xs uppercase tracking-wider text-accent">
          {filesVsChat.files.title}
        </h4>
        <ul className="flex flex-col gap-2.5">
          {filesVsChat.files.lines.map((line, index) => {
            const lead = "path" in line ? line.path : line.label;
            return (
              <ContrastPill
                key={lead}
                tone="accent"
                index={index}
                visible={visible}
              >
                {`${lead} → ${line.to}`}
              </ContrastPill>
            );
          })}
        </ul>
      </article>
    </div>
  );
}
