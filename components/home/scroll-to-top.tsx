"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/home/icon";
import { icons } from "@/lib/home-data";

const SHOW_AFTER = 400;

export function ScrollToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useLenis((instance) => {
    setVisible(instance.scroll > SHOW_AFTER);
  });

  useEffect(() => {
    if (lenis) return;
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  const scrollTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Scroll to top"
      className={`fixed right-5 bottom-5 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-[opacity,transform,colors] duration-300 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none sm:right-8 sm:bottom-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <Icon src={icons.arrowUp} size={16} currentColor />
    </button>
  );
}
