"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { recommendedFlow } from "@/lib/home-data";

function PipelineTitle({
  name,
  title,
}: {
  name?: string;
  title: string;
}) {
  const className = name
    ? "whitespace-nowrap text-center font-mono text-sm text-accent transition-colors hover:text-foreground focus-visible:text-foreground"
    : "whitespace-nowrap text-center font-display text-sm font-semibold tracking-tight text-foreground";

  if (name) {
    return (
      <Link href={`/skills/${name}`} className={className}>
        {title}
      </Link>
    );
  }

  return <span className={className}>{title}</span>;
}

export function RecommendedFlowPipeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={railRef}
      className="overflow-x-auto [scrollbar-width:thin]"
    >
      <div className="flow-pipeline">
        <ol className="flex w-full items-start">
          {recommendedFlow.loop.map((step, index) => (
            <li
              key={step.number}
              className={`flow-step relative flex flex-1 flex-col items-center gap-3 ${
                visible ? "flow-step-visible" : ""
              }`}
              style={{ "--flow-delay": `${index * 160}ms` } as CSSProperties}
            >
              <PipelineTitle
                name={"name" in step ? step.name : undefined}
                title={step.title}
              />
              <span className="font-mono text-xs leading-none text-muted-dim">
                {step.number}
              </span>
              <span className="flow-dot-track">
                <span className="flow-dot" />
              </span>
              <p className="px-2 text-center font-text text-sm leading-snug text-muted">
                {step.job}
              </p>
              <span className="px-1 text-center font-mono text-xs leading-snug text-muted-dim">
                {step.artifact}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
