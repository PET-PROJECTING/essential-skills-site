"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type SkillDocPreviewProps = {
  children: ReactNode;
};

export function SkillDocPreview({ children }: SkillDocPreviewProps) {
  const lenis = useLenis();
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) {
      return;
    }

    const node = contentRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      setOverflows(node.scrollHeight > node.clientHeight + 1);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [expanded, children]);

  function handleExpand() {
    setExpanded(true);
    requestAnimationFrame(() => lenis?.resize());
  }

  const clamped = !expanded && overflows;

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className={
          expanded
            ? undefined
            : "max-h-[min(70vh,calc(100dvh-14rem))] overflow-hidden"
        }
      >
        {children}
      </div>

      {clamped ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-48 items-end justify-center bg-gradient-to-t from-surface from-15% via-surface/70 via-45% to-transparent to-100% pb-1">
          <button
            type="button"
            onClick={handleExpand}
            className="pointer-events-auto rounded-md border border-border bg-surface-raised px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
          >
            Show all
          </button>
        </div>
      ) : null}
    </div>
  );
}
