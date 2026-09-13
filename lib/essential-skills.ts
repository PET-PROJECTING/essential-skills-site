import { essentialSkillsSnapshot } from "@/lib/essential-skills.snapshot";
import { recommendedSkillNames } from "@/lib/home-data";

export type SkillTag = {
  label: string;
  accent?: boolean;
};

export type Skill = {
  name: string;
  description: string;
  tags: SkillTag[];
  recommended?: boolean;
};

export type PackageSkillsData = {
  version: string;
  skills: Skill[];
  totalCount: number;
  quickCount: number;
  fullCount: number;
};

const REGISTRY_URL = "https://registry.npmjs.org/essential-skills";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const PRESET_ORDER = ["Quick", "Full"] as const;

const recommendedOrder = new Map<string, number>(
  recommendedSkillNames.map((name, index) => [name, index]),
);

type NpmPackageDocument = {
  "dist-tags"?: { latest?: string };
  readme?: string;
};

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function presetsToTags(presetCell: string): SkillTag[] {
  const found = new Set(
    presetCell
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
  );

  const ordered = PRESET_ORDER.filter((label) => found.has(label));
  const extras = [...found].filter(
    (label) => !PRESET_ORDER.includes(label as (typeof PRESET_ORDER)[number]),
  );

  return [...ordered, ...extras].map((label) => ({
    label,
    accent: label === "Full" ? true : undefined,
  }));
}

function withRecommendedOrder(skills: Skill[]): Skill[] {
  return [...skills]
    .map((skill) => ({
      ...skill,
      recommended: recommendedOrder.has(skill.name),
    }))
    .sort((a, b) => {
      const aIndex = recommendedOrder.get(a.name);
      const bIndex = recommendedOrder.get(b.name);

      if (aIndex !== undefined && bIndex !== undefined) {
        return aIndex - bIndex;
      }
      if (aIndex !== undefined) return -1;
      if (bIndex !== undefined) return 1;
      return 0;
    });
}

function parseIncludedSkillsTable(readme: string): Skill[] {
  const match = readme.match(
    /## Included skills\s*\n+((?:\|.+\n)+)/i,
  );

  if (!match) {
    throw new Error("Included skills table not found in npm readme");
  }

  const skills: Skill[] = [];

  for (const line of match[1].split("\n")) {
    if (!line.startsWith("|")) {
      continue;
    }

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 3) {
      continue;
    }

    const [rawName, rawDescription, rawPreset] = cells;

    if (
      /^skill$/i.test(rawName) ||
      /^-+$/.test(rawName.replace(/\s/g, ""))
    ) {
      continue;
    }

    const name = rawName.replace(/^`|`$/g, "").trim();
    if (!name) {
      continue;
    }

    skills.push({
      name,
      description: stripMarkdownLinks(rawDescription),
      tags: presetsToTags(rawPreset),
    });
  }

  if (skills.length === 0) {
    throw new Error("Included skills table parsed empty");
  }

  return skills;
}

function withCounts(
  version: string,
  skills: Skill[],
): PackageSkillsData {
  const ordered = withRecommendedOrder(skills);
  const quickCount = ordered.filter((skill) =>
    skill.tags.some((tag) => tag.label === "Quick"),
  ).length;
  const fullCount = ordered.filter((skill) =>
    skill.tags.some((tag) => tag.label === "Full"),
  ).length;

  return {
    version,
    skills: ordered,
    totalCount: ordered.length,
    quickCount,
    fullCount,
  };
}

function parsePackageDocument(doc: NpmPackageDocument): PackageSkillsData {
  const version = doc["dist-tags"]?.latest;
  const readme = doc.readme;

  if (!version) {
    throw new Error("npm package missing dist-tags.latest");
  }

  if (!readme) {
    throw new Error("npm package missing readme");
  }

  return withCounts(version, parseIncludedSkillsTable(readme));
}

export async function getPackageSkills(): Promise<PackageSkillsData> {
  try {
    const response = await fetch(REGISTRY_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`npm registry responded ${response.status}`);
    }

    const doc = (await response.json()) as NpmPackageDocument;
    return parsePackageDocument(doc);
  } catch {
    return withCounts(
      essentialSkillsSnapshot.version,
      essentialSkillsSnapshot.skills,
    );
  }
}

export function getSkillByName(
  data: PackageSkillsData,
  name: string,
): Skill | undefined {
  return data.skills.find((skill) => skill.name === name);
}
