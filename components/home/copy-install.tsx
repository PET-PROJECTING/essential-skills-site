"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/icon";
import { icons, site } from "@/lib/home-data";

export function CopyInstall() {
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    setCopied(true);
    setFlashing(true);
    setBurst((n) => n + 1);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 3000);

    try {
      await navigator.clipboard.writeText(site.installCommand);
    } catch {
      // Clipboard may be unavailable in insecure contexts.
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3 sm:gap-6 sm:px-5">
      <div className="flex items-center gap-2.5 font-mono text-sm">
        <span className="text-accent">$</span>
        <span className="font-medium text-foreground">{site.installCommand}</span>
      </div>
      <span aria-hidden className="hidden h-4 w-px bg-border sm:block" />
      <button
        type="button"
        onClick={handleCopy}
        aria-live="polite"
        className="copy-install-btn relative flex cursor-pointer items-center justify-center rounded-md px-2 py-1 font-mono text-xs font-semibold text-accent"
      >
        {flashing ? (
          <span
            key={`flash-${burst}`}
            className="copy-install-flash"
            onAnimationEnd={() => setFlashing(false)}
          />
        ) : null}
        <span className="invisible inline-flex items-center gap-1.5" aria-hidden>
          <Icon src={icons.check} size={14} currentColor />
          Copied
        </span>
        <span
          key={`${copied}-${burst}`}
          className={`copy-install-label absolute inset-0 inline-flex items-center justify-center gap-1.5 ${
            burst > 0 ? (copied ? "is-pop" : "is-restore") : ""
          }`}
        >
          <Icon
            src={copied ? icons.check : icons.clipboardCopy}
            size={14}
            currentColor
            className="copy-install-icon"
          />
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    </div>
  );
}
