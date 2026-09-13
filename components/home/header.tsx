"use client";

import { Icon } from "@/components/home/icon";
import { ScrollSectionButton } from "@/components/home/scroll-section";
import { icons, navLinks, site } from "@/lib/home-data";

export function Header() {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border px-5 py-4 sm:px-10 lg:h-[72px] lg:px-20 lg:py-0">
      <div className="flex items-center gap-2">
        <Icon src={icons.package} size={20} />
        <span className="font-display text-base font-bold tracking-tight text-foreground">
          {site.name}
        </span>
      </div>

      <nav className="order-3 flex w-full items-center justify-center gap-6 text-sm sm:order-none sm:w-auto sm:gap-8">
        {navLinks.map((link) => (
          <ScrollSectionButton
            key={link.id}
            sectionId={link.id}
            className="text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
          >
            {link.label}
          </ScrollSectionButton>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <a
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          <Icon src={icons.github} size={16} currentColor />
          <span>{site.githubLabel}</span>
        </a>
        <a
          href={site.npmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          <Icon src={icons.boxSelect} size={16} currentColor />
          <span>{site.npmLabel}</span>
        </a>
      </div>
    </header>
  );
}
