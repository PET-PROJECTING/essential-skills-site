import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollSectionButton } from "@/components/home/scroll-section";
import { SkillDocPreview } from "@/components/skills/skill-doc-preview";
import { SkillMarkdown } from "@/components/skills/skill-markdown";
import { getPackageSkills, getSkillByName } from "@/lib/essential-skills";
import { site, skillsExplorer } from "@/lib/home-data";
import { getSkillMarkdown } from "@/lib/skill-content";

export async function generateStaticParams() {
  const packageSkills = await getPackageSkills();
  return packageSkills.skills.map((skill) => ({ name: skill.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const packageSkills = await getPackageSkills();
  const skill = getSkillByName(packageSkills, name);

  if (!skill) {
    return { title: "Skill not found" };
  }

  const path = `/skills/${skill.name}`;

  return {
    title: skill.name,
    description: skill.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: site.name,
      title: skill.name,
      description: skill.description,
    },
    twitter: {
      card: "summary_large_image",
      title: skill.name,
      description: skill.description,
    },
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const packageSkills = await getPackageSkills();
  const skill = getSkillByName(packageSkills, name);
  const markdown = skill ? await getSkillMarkdown(skill.name) : null;

  if (!skill || !markdown) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col items-center bg-background px-5 py-16 sm:px-10 lg:px-20">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <ScrollSectionButton
          sectionId="skills"
          className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          <span
            aria-hidden
            className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5"
          >
            ←
          </span>
          Back to Skills
        </ScrollSectionButton>

        <div className="flex flex-col gap-4 border-b border-border pb-8">
          <h1 className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {skill.name}
          </h1>
          <p className="text-[15px] leading-relaxed text-muted">
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
        </div>

        <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
          <SkillDocPreview>
            <SkillMarkdown markdown={markdown} />
          </SkillDocPreview>
        </div>
      </div>
    </div>
  );
}
