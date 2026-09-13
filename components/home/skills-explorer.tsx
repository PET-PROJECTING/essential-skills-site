"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/home/icon";
import type { Skill } from "@/lib/essential-skills";
import { icons, skillsExplorer } from "@/lib/home-data";

/** 3 cols × 3 rows on large screens; matches the prior preview density. */
const INITIAL_VISIBLE = 9;
const REVEAL_STAGGER_MS = 55;
const SHOW_MORE_EXIT_MS = 200;

type SkillsExplorerProps = {
  skills: Skill[];
};

export function SkillsExplorer({ skills }: SkillsExplorerProps) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [exitingShowMore, setExitingShowMore] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;
  const filteredSkills = isSearching
    ? skills.filter((skill) =>
        skill.name.toLowerCase().includes(normalizedQuery),
      )
    : skills;

  const canCollapse = !isSearching && filteredSkills.length > INITIAL_VISIBLE;
  const visibleSkills =
    canCollapse && !expanded
      ? filteredSkills.slice(0, INITIAL_VISIBLE)
      : filteredSkills;
  const hiddenCount = filteredSkills.length - INITIAL_VISIBLE;
  const showMoreVisible = canCollapse && !expanded;

  function handleShowMore() {
    if (exitingShowMore) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setExpanded(true);
      return;
    }

    setExitingShowMore(true);
    window.setTimeout(() => {
      setExpanded(true);
      setExitingShowMore(false);
    }, SHOW_MORE_EXIT_MS);
  }

  return (
    <section
      id="skills"
      className="relative flex w-full flex-col gap-8 border-b border-border px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-20"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {skillsExplorer.title}
          </h2>
          <p className="font-text text-[13px] text-muted">
            {skillsExplorer.description}
          </p>
        </div>

        <label className="group flex h-9 w-full items-center gap-2 rounded-md border border-border bg-surface px-3 transition-colors hover:border-accent focus-within:border-accent sm:w-60">
          <Icon
            src={icons.databaseSearch}
            size={14}
            currentColor
            className="text-muted-dim transition-colors group-hover:text-accent group-focus-within:text-accent"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={skillsExplorer.searchPlaceholder}
            className="w-full bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-dim"
            aria-label={skillsExplorer.searchPlaceholder}
          />
        </label>
      </div>

      {filteredSkills.length === 0 ? (
        <p className="text-[13px] text-muted">No skills match</p>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSkills.map((skill, index) => {
              const isRevealed = expanded && index >= INITIAL_VISIBLE;

              return (
                <Link
                  key={skill.name}
                  href={`/skills/${skill.name}`}
                  className={`group flex flex-col gap-5 rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent${
                    isRevealed ? " skill-reveal" : ""
                  }`}
                  style={
                    isRevealed
                      ? {
                          animationDelay: `${(index - INITIAL_VISIBLE) * REVEAL_STAGGER_MS}ms`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-sm font-semibold text-foreground">
                      {skill.name}
                    </span>
                    <Icon
                      src={icons.arrowUpRight}
                      size={16}
                      currentColor
                      className="text-muted-dim transition-colors group-hover:text-accent"
                    />
                  </div>
                  <p className="text-[13px] leading-normal text-muted">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.recommended ? (
                      <span className="rounded border border-accent bg-accent-soft px-2 py-1 font-mono text-[10px] font-medium text-accent">
                        {skillsExplorer.recommendedBadge}
                      </span>
                    ) : null}
                    {skill.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`rounded border px-2 py-1 font-mono text-[10px] font-medium ${
                          tag.accent
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border bg-surface-raised text-muted"
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          {showMoreVisible ? (
            <button
              type="button"
              onClick={handleShowMore}
              className={`mx-auto rounded-md border border-border bg-surface px-4 py-2 font-mono text-[12px] font-medium text-muted transition-colors hover:border-accent hover:text-accent${
                exitingShowMore ? " skill-show-more-exit" : ""
              }`}
            >
              {`Show more (${hiddenCount} more)`}
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
