"use client";

import { useEffect, useRef, useState } from "react";

type HeroTypingProps = {
  title: string;
  description: string;
};

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroTyping({ title, description }: HeroTypingProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [titleShown, setTitleShown] = useState("");
  const [descShown, setDescShown] = useState("");
  const [active, setActive] = useState<"title" | "desc" | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setTitleShown(title);
      setDescShown(description);
      setActive(null);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [title, description]);

  useEffect(() => {
    if (!started) return;

    let cancelled = false;
    const charMs = 32;
    const pauseMs = 400;

    async function run() {
      setActive("title");
      for (let i = 1; i <= title.length; i++) {
        if (cancelled) return;
        setTitleShown(title.slice(0, i));
        await delay(charMs);
      }
      if (cancelled) return;
      setActive(null);
      await delay(pauseMs);
      if (cancelled) return;

      setActive("desc");
      for (let i = 1; i <= description.length; i++) {
        if (cancelled) return;
        setDescShown(description.slice(0, i));
        await delay(charMs);
      }
      if (cancelled) return;
      setActive(null);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [started, title, description]);

  return (
    <div ref={rootRef} className="flex w-full flex-col items-center gap-4 text-center">
      <h1 className="grid w-full font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        <span className="sr-only">{title}</span>
        <span className="invisible col-start-1 row-start-1" aria-hidden>
          {title}
        </span>
        <span
          className="col-start-1 row-start-1"
          aria-hidden
        >
          {titleShown}
          {active === "title" ? <span className="type-caret" /> : null}
        </span>
      </h1>
      <p className="grid max-w-[600px] font-text text-base leading-normal text-muted">
        <span className="sr-only">{description}</span>
        <span className="invisible col-start-1 row-start-1" aria-hidden>
          {description}
        </span>
        <span className="col-start-1 row-start-1" aria-hidden>
          {descShown}
          {active === "desc" ? <span className="type-caret type-caret-muted" /> : null}
        </span>
      </p>
    </div>
  );
}
