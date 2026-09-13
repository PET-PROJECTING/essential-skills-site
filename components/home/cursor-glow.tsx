"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Viewport-fixed cursor trail. Does not wrap page content,
 * so it cannot clip layout or interfere with scroll height.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 0.5, y: 0.2 });
  const currentRef = useRef({ x: 0.5, y: 0.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) {
      el.style.display = "none";
      return;
    }

    let running = true;

    const tick = () => {
      const cur = currentRef.current;
      const target = targetRef.current;
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      el.style.setProperty("--glow-x", `${cur.x * 100}%`);
      el.style.setProperty("--glow-y", `${cur.y * 100}%`);
      if (running) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      targetRef.current = {
        x: event.clientX / width,
        y: event.clientY / height,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 cursor-glow"
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "20%",
        } as CSSProperties
      }
    />
  );
}
