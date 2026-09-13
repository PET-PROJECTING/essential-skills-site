export type Pack = {
  name: string;
  badge: string;
  badgeAccent?: boolean;
  description: string;
  features: string[];
  featured?: boolean;
};

export const site = {
  name: "Essential Skills",
  installCommand: "npx essential-skills",
  githubLabel: "GitHub",
  githubUrl: "https://github.com/PET-PROJECTING/essential-skills",
  npmLabel: "npm",
  npmUrl: "https://www.npmjs.com/package/essential-skills",
} as const;

export const navLinks = [
  { label: "How it works", id: "how-it-works" },
  { label: "Packs", id: "packs" },
  { label: "Skills", id: "skills" },
] as const;

export const hero = {
  badge: "OPEN-SOURCE CLI FOR AGENTS",
  title: "Better habits for your AI coding agent",
  description:
    "Install curated, structured skill protocols directly into your agent's system prompt directory. Enforce TDD, SOLID principles, and clean commits instantly.",
  staticStats: ["7 agents supported", "MIT License"] as const,
} as const;

export function getHeroStats(skillCount: number): string[] {
  return [`${skillCount} skills`, ...hero.staticStats];
}

export const howItWorks = {
  title: "How it works",
  steps: [
    {
      number: "01",
      title: "Run the CLI",
      description:
        "Run npx essential-skills in your terminal. Choose Install skills to copy protocols into agent folders — or Clear if you need a reset.",
    },
    {
      number: "02",
      title: "Choose scope & agents",
      description:
        "Install globally (every project) or into the current repo, then multi-select which agents get the skills — Cursor, Claude Code, Codex, and more.",
    },
    {
      number: "03",
      title: "Pick your skills",
      description:
        "Take the Quick pack for fast iteration, Full for production rails with TDD, or choose skills manually from the catalog.",
    },
  ],
  terminal: {
    command: "npx essential-skills",
    title: "essential-skills",
    answered: [
      {
        question: "What would you like to do?",
        answer: "Install skills",
      },
      {
        question: "How do you want to install these skills?",
        answer: "Global (home)",
      },
      {
        question: "Which agents should receive these skills?",
        answer: "Claude Code, Cursor, Codex, Copilot…",
      },
    ],
    active: {
      question: "How do you want to pick skills?",
      options: [
        {
          label: "Quick (pet projects)",
          hint: "Fast iteration — no TDD",
          selected: true,
        },
        {
          label: "Full (production)",
          hint: "Strict TDD & architecture",
          selected: false,
        },
        {
          label: "Choose manually",
          hint: "Pick from the catalog",
          selected: false,
        },
      ],
    },
    footer: "↑/↓ to navigate • Enter: confirm",
  },
} as const;

export const packsSection = {
  title: "Select your discipline depth",
  description:
    "Choose between standard low-friction setup or production-grade architecture rails.",
} as const;

export function getPacks(quickCount: number, totalCount: number): Pack[] {
  return [
    {
      name: "Quick Pack",
      badge: "Pet Projects & Prototypes",
      description:
        "Designed for high-velocity coding sessions. Omits rigid testing requirements to let you explore ideas fast.",
      features: [
        `${quickCount} core productivity skills`,
        "No testing or TDD constraints",
        "Ultra fast prompt execution limits",
      ],
    },
    {
      name: "Full Pack",
      badge: "Recommended for Production",
      badgeAccent: true,
      featured: true,
      description:
        "Rigid, professional guardrails. Enforces testing patterns, Storybook alignment, conventional commits, and clean architecture reviews.",
      features: [
        `All ${totalCount} skills including test pipelines`,
        "Mandatory test-driven-development loops",
        "Automatic Storybook & architecture validations",
      ],
    },
  ];
}

export const skillsExplorer = {
  title: "Skills Explorer",
  description: "Review the exact instruction files being injected.",
  searchPlaceholder: "Search skills...",
  recommendedBadge: "Recommended",
} as const;

/** Featured in the explorer first, in this order. */
export const recommendedSkillNames = [
  "grill-me",
  "create-commit",
  "find-skills",
] as const;

export const agentsStrip = {
  label: "NATIVELY ENFORCED ACROSS ALL AGENTS",
  agents: [
    {
      name: "Claude Code",
      href: "https://code.claude.com/docs/en/skills",
    },
    {
      name: "Cursor",
      href: "https://cursor.com/docs/context/skills",
    },
    {
      name: "Codex",
      href: "https://developers.openai.com/codex/skills/",
    },
    {
      name: "Copilot",
      href: "https://docs.github.com/en/copilot/concepts/agents/about-agent-skills",
    },
    {
      name: "Gemini CLI",
      href: "https://geminicli.com/docs/cli/skills/",
    },
    {
      name: "OpenCode",
      href: "https://opencode.ai/v2/docs/skills",
    },
    {
      name: "Universal",
      href: "https://agentskills.io/client-implementation/adding-skills-support",
    },
  ] as const,
} as const;

export const integration = {
  title: "Project or global install",
  description:
    "Choose project or global during install. Skills are copied into each agent's skills folder — no daemons, no cloud, and nothing sent back.",
  scopes: [
    {
      icon: "package" as const,
      before: "Project: installs into the current repo (e.g. ",
      paths: [".cursor/skills", ".agents/skills"] as const,
      after: ").",
    },
    {
      icon: "globe" as const,
      text: "Global: installs into each agent's home-directory skills folder.",
    },
  ],
  noteTitle: "POST-INSTALL NOTE",
  noteBefore: "After install, restart your agent session. Run ",
  noteHighlight: "/show-skill-catalog",
  noteAfter: " anytime to see what was copied.",
} as const;

export const cta = {
  title: "Ready to upgrade your agent's habits?",
  description:
    "Get immediate compliance. Join developers enforcing clean test loops and explicit software engineering patterns natively.",
  primary: "npx essential-skills",
  secondary: "Star on GitHub",
} as const;

export const footer = {
  copyright: "© 2026 Essential Skills CLI. Released under the MIT License.",
} as const;


export const icons = {
  package: "/icons/package.svg",
  github: "/icons/github.svg",
  boxSelect: "/icons/box-select.svg",
  clipboardCopy: "/icons/clipboard-copy.svg",
  ellipse: "/icons/ellipse.svg",
  check: "/icons/check.svg",
  databaseSearch: "/icons/database-search.svg",
  arrowUpRight: "/icons/arrow-up-right.svg",
  arrowUp: "/icons/arrow-up.svg",
  terminal: "/icons/terminal.svg",
  packageMuted: "/icons/package-muted.svg",
  globe: "/icons/globe.svg",
  alertCircle: "/icons/alert-circle.svg",
  terminalDark: "/icons/terminal-dark.svg",
  githubLight: "/icons/github-light.svg",
} as const;
