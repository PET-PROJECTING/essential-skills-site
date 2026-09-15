"use client";

import { useEffect, useRef } from "react";

const GLYPHS =
  "01{}[]<>/\\|$&#%*+=~:;.,-_01{}[]<>$#*/01ABCDEF".split("");

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type Drop = {
  x: number;
  y: number;
  speed: number;
  size: number;
  glyph: string;
  alpha: number;
  flipAt: number;
};

function parseHexColor(value: string): Rgb | null {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!match?.[1]) return null;

  const raw = match[1];
  if (raw.length === 3) {
    return {
      r: Number.parseInt(raw[0] + raw[0], 16),
      g: Number.parseInt(raw[1] + raw[1], 16),
      b: Number.parseInt(raw[2] + raw[2], 16),
    };
  }

  return {
    r: Number.parseInt(raw.slice(0, 2), 16),
    g: Number.parseInt(raw.slice(2, 4), 16),
    b: Number.parseInt(raw.slice(4, 6), 16),
  };
}

function createDrop(width: number, height: number, fromTop: boolean): Drop {
  return {
    x: Math.random() * width,
    y: fromTop ? -Math.random() * height * 0.4 : Math.random() * height,
    speed: 0.45 + Math.random() * 1.35,
    size: 11 + Math.floor(Math.random() * 8),
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0",
    alpha: 0.1 + Math.random() * 0.22,
    flipAt: 8 + Math.floor(Math.random() * 28),
  };
}

export function SymbolRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const accent = parseHexColor(
      getComputedStyle(document.documentElement).getPropertyValue("--accent"),
    );
    if (!accent) return;

    let drops: Drop[] = [];
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dense field — roughly one stream every ~14px
      const count = Math.max(64, Math.floor(width / 14));
      drops = Array.from({ length: count }, () =>
        createDrop(width, height, false),
      );
    };

    const tick = () => {
      if (!running) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";

      for (const drop of drops) {
        drop.y += drop.speed;
        drop.flipAt -= 1;
        if (drop.flipAt <= 0) {
          drop.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0";
          drop.flipAt = 10 + Math.floor(Math.random() * 30);
        }
        if (drop.y > height + 24) {
          Object.assign(drop, createDrop(width, height, true));
          drop.y = -20 - Math.random() * 80;
        }

        const lead = drop.alpha + 0.12;
        ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${Math.min(lead, 0.42)})`;
        ctx.font = `500 ${drop.size}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.fillText(drop.glyph, drop.x, drop.y);

        ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${drop.alpha * 0.4})`;
        ctx.fillText(
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "1",
          drop.x,
          drop.y - drop.size * 1.15,
        );
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
