"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        // Observe <body>: <html> height can stay viewport-sized while
        // page content grows (e.g. expanded skills), so Lenis would miss resizes.
        content: typeof document !== "undefined" ? document.body : undefined,
        lerp: 0.1,
        anchors: false,
        autoRaf: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
