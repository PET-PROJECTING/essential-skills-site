"use client";

import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

const SCROLL_SECTION_KEY = "scroll-section";

export function scrollToSection(id: string, lenis?: Lenis | null) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { duration: 1.1 });
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function queueScrollSection(id: string) {
  sessionStorage.setItem(SCROLL_SECTION_KEY, id);
}

export function ScrollSectionRestore() {
  const lenis = useLenis();

  useEffect(() => {
    const id = sessionStorage.getItem(SCROLL_SECTION_KEY);
    if (!id) return;

    sessionStorage.removeItem(SCROLL_SECTION_KEY);

    const run = () => scrollToSection(id, lenis);
    const frame = window.requestAnimationFrame(() => {
      window.setTimeout(run, 50);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lenis]);

  return null;
}

type ScrollSectionButtonProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">;

export function ScrollSectionButton({
  sectionId,
  children,
  className,
  ...props
}: ScrollSectionButtonProps) {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (pathname === "/") {
      scrollToSection(sectionId, lenis);
      return;
    }

    queueScrollSection(sectionId);
    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
