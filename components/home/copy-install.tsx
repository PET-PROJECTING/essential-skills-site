"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/icon";
import { icons, site } from "@/lib/home-data";

export function CopyInstall() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(site.installCommand);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
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
        className="flex min-w-[4.75rem] cursor-pointer items-center justify-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors"
      >
        <Icon
          src={copied ? icons.check : icons.clipboardCopy}
          size={14}
          currentColor
        />
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
