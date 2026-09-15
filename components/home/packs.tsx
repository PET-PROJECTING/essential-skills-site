"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/home/icon";
import { icons, packsSection, type Pack } from "@/lib/home-data";

type PacksProps = {
  packs: Pack[];
};

export function Packs({ packs }: PacksProps) {
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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="packs"
      className="relative flex w-full flex-col gap-8 border-b border-border px-5 py-14 sm:gap-10 sm:px-10 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
          {packsSection.title}
        </h2>
        <p className="font-text text-sm text-muted">{packsSection.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        {packs.map((pack, index) => (
          <article
            key={pack.name}
            className={`pack-fade flex h-full flex-col gap-6 rounded-lg border bg-surface p-6 sm:p-8 ${
              pack.featured
                ? "border-accent pack-featured"
                : "border-border"
            } ${visible ? "pack-fade-visible" : ""}`}
            style={{ "--pack-delay": `${index * 160}ms` } as CSSProperties}
          >
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  {pack.name}
                </h3>
                <span
                  className={`rounded border px-2 py-1 font-mono text-xs font-medium ${
                    pack.badgeAccent
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border bg-surface-raised text-muted"
                  }`}
                >
                  {pack.badge}
                </span>
              </div>
              <p className="text-sm leading-normal text-muted">
                {pack.description}
              </p>
            </div>
            <hr className="border-border" />
            <ul className="flex flex-col gap-3">
              {pack.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Icon src={icons.check} size={14} />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
