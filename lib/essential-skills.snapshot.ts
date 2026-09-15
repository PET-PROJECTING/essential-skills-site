import type { PackageSkillsData } from "@/lib/essential-skills";

/** Hand-maintained fallback when the npm registry is unreachable. */
export const essentialSkillsSnapshot: PackageSkillsData = {
  version: "1.9.1",
  totalCount: 21,
  quickCount: 13,
  fullCount: 21,
  skills: [
    {
      name: "show-skill-catalog",
      description: "List this pack and route you to the right skill",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "find-skills",
      description: "Discover and install skills from the open ecosystem",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "grill-me",
      description:
        "Interview before implementation; skip only pure Q&A or read-only review with no follow-up",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "specify-context",
      description:
        "Bootstrap docs context files, merge AGENTS.md/CLAUDE.md, grill one unfilled file per run",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "create-feature-spec",
      description:
        "Grill a unit spec under feature-specs and update the progress tracker (installs with specify-context)",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "fix-tech-debt",
      description:
        "Discover README/TODO/FIX debt, group by domain, pick items, grill an implementation plan",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "request-refactor-plan",
      description:
        "Interview, then file a GitHub issue with a tiny-commit refactor plan",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "apply-solid-principles",
      description:
        "Apply SRP, OCP, LSP, ISP, and DIP to named or changed modules",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "create-commit",
      description:
        "Split work into logical conventional commits; uses agent session history when available",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "fix-lint",
      description: "Fix Biome or ESLint issues on named or changed files",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "apply-prettier",
      description: "Format named or changed files with the project's Prettier",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "apply-style-guide",
      description:
        "Apply a repo style guide, or Google's language guide if none",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "write-handoff",
      description:
        "Compact the current conversation for another agent to continue",
      tags: [
        { label: "Quick" },
        { label: "Full", accent: true },
      ],
    },
    {
      name: "develop-with-tdd",
      description: "Write the failing test first, then the implementation",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "write-unit-tests",
      description: "Write unit tests for named units",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "write-e2e-tests",
      description: "Write e2e tests for files you name",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "write-storybook",
      description: "Write Storybook stories for named components",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "review-code",
      description:
        "Two-axis review of changes against repo standards and the spec",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "apply-best-practices",
      description:
        "React and Next.js performance guidelines from Vercel Engineering",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "feature-sliced-design",
      description: "Feature-Sliced Design (FSD) v2.1 from fsd.how",
      tags: [{ label: "Full", accent: true }],
    },
    {
      name: "use-hybrid-folder-structure",
      description:
        "Hybrid frontend layout: responsibility first, feature second",
      tags: [{ label: "Full", accent: true }],
    },
  ],
};
