import type { MetadataRoute } from "next";
import { getPackageSkills } from "@/lib/essential-skills";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl();
  const packageSkills = await getPackageSkills();

  return [
    {
      url: origin,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...packageSkills.skills.map((skill) => ({
      url: `${origin}/skills/${skill.name}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
