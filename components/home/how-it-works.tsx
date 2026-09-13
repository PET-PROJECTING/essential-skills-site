"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { howItWorks } from "@/lib/home-data";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.35, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { terminal } = howItWorks;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative flex w-full flex-col gap-10 border-b border-border px-5 py-14 sm:gap-14 sm:px-10 sm:py-16 lg:px-20 lg:py-20"
    >
      <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
        {howItWorks.title}
      </h2>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-10">
        <div className="flex flex-col gap-8 sm:gap-10">
          {howItWorks.steps.map((step, index) => (
            <div
              key={step.number}
              className={`how-step flex flex-col gap-3 ${visible ? "how-step-visible" : ""}`}
              style={{ "--how-delay": `${index * 220}ms` } as CSSProperties}
            >
              <span className="font-mono text-xs text-accent">{step.number}</span>
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-normal text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`how-step overflow-hidden rounded-lg border border-border bg-surface ${visible ? "how-step-visible" : ""}`}
          style={{ "--how-delay": "480ms" } as CSSProperties}
          aria-hidden
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="ml-2 font-mono text-[11px] text-muted-dim">
              {terminal.title}
            </span>
          </div>

          <div className="space-y-4 px-4 py-4 font-mono text-[12px] leading-relaxed sm:px-5 sm:py-5 sm:text-[13px]">
            <p>
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">{terminal.command}</span>
            </p>

            <p className="text-muted-dim">{terminal.title}</p>

            <div className="space-y-3">
              {terminal.answered.map((item) => (
                <div key={item.question} className="space-y-1">
                  <p className="text-muted">
                    <span className="text-accent">◇</span> {item.question}
                  </p>
                  <p className="pl-4 text-foreground">
                    <span className="text-muted-dim">│</span> {item.answer}
                  </p>
                </div>
              ))}

              <div className="space-y-1.5">
                <p className="text-muted">
                  <span className="text-accent">◆</span> {terminal.active.question}
                </p>
                <ul className="space-y-1 pl-4">
                  {terminal.active.options.map((option, index) => {
                    const isLast =
                      index === terminal.active.options.length - 1;
                    return (
                      <li
                        key={option.label}
                        className={
                          option.selected
                            ? "text-foreground"
                            : "text-muted-dim"
                        }
                      >
                        <span className="text-muted-dim">
                          {isLast ? "└" : "│"}
                        </span>{" "}
                        <span
                          className={
                            option.selected
                              ? "text-accent"
                              : "text-muted-dim"
                          }
                        >
                          {option.selected ? "●" : "○"}
                        </span>{" "}
                        {option.label}
                        <span className="text-muted-dim">
                          {" "}
                          ({option.hint})
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <p className="pt-1 text-[11px] text-muted-dim">{terminal.footer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
