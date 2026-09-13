import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_SKILLS_DIR = path.join(process.cwd(), "content", "skills");

const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

export function stripSkillFrontmatter(markdown: string): string {
  return markdown.replace(FRONTMATTER_RE, "").trimStart();
}

export async function listSyncedSkillNames(): Promise<string[]> {
  try {
    const entries = await readdir(CONTENT_SKILLS_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export async function getSkillMarkdown(name: string): Promise<string | null> {
  const filePath = path.join(CONTENT_SKILLS_DIR, name, "SKILL.md");

  try {
    const raw = await readFile(filePath, "utf8");
    return stripSkillFrontmatter(raw);
  } catch {
    return null;
  }
}
