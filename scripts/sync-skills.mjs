import { createWriteStream } from "node:fs";
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);

const REPO = "PET-PROJECTING/essential-skills";
const BRANCH = "main";
const TARBALL_URL = `https://codeload.github.com/${REPO}/tar.gz/${BRANCH}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const contentSkillsDir = path.join(rootDir, "content", "skills");

async function downloadTarball(destFile) {
  const response = await fetch(TARBALL_URL);

  if (!response.ok || !response.body) {
    throw new Error(
      `Failed to download ${TARBALL_URL} (${response.status} ${response.statusText})`,
    );
  }

  await pipeline(response.body, createWriteStream(destFile));
}

async function collectSkillMarkdown(extractDir) {
  const topEntries = await readdir(extractDir, { withFileTypes: true });
  const repoRoot = topEntries.find((entry) => entry.isDirectory());

  if (!repoRoot) {
    throw new Error("Tarball extracted with no root directory");
  }

  const skillsRoot = path.join(extractDir, repoRoot.name, "skills");
  let skillDirs;

  try {
    skillDirs = await readdir(skillsRoot, { withFileTypes: true });
  } catch {
    throw new Error("skills/ directory not found in repository tarball");
  }

  const skills = [];

  for (const entry of skillDirs) {
    if (!entry.isDirectory()) {
      continue;
    }

    const skillFile = path.join(skillsRoot, entry.name, "SKILL.md");
    try {
      const markdown = await readFile(skillFile, "utf8");
      skills.push({ name: entry.name, markdown });
    } catch {
      // Skip folders without SKILL.md
    }
  }

  if (skills.length === 0) {
    throw new Error("No SKILL.md files found in repository skills/");
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

async function writeSkillsReplace(skills) {
  // Replace the whole tree so re-runs never accumulate stale folders.
  await rm(contentSkillsDir, { recursive: true, force: true });
  await mkdir(contentSkillsDir, { recursive: true });

  for (const skill of skills) {
    const skillDir = path.join(contentSkillsDir, skill.name);
    await mkdir(skillDir, { recursive: true });
    await writeFile(path.join(skillDir, "SKILL.md"), skill.markdown, "utf8");
  }
}

async function main() {
  const workDir = await mkdtemp(path.join(tmpdir(), "essential-skills-sync-"));
  const tarballPath = path.join(workDir, "repo.tar.gz");

  try {
    console.log(`Fetching ${TARBALL_URL}`);
    await downloadTarball(tarballPath);
    await execFileAsync("tar", ["-xzf", tarballPath, "-C", workDir]);

    const skills = await collectSkillMarkdown(workDir);
    await writeSkillsReplace(skills);

    console.log(
      `Synced ${skills.length} skills → ${path.relative(rootDir, contentSkillsDir)}`,
    );
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
