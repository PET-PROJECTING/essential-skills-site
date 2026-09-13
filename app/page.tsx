import { AgentsStrip } from "@/components/home/agents-strip";
import { Cta } from "@/components/home/cta";
import { CursorGlow } from "@/components/home/cursor-glow";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Integration } from "@/components/home/integration";
import { Packs } from "@/components/home/packs";
import { ScrollSectionRestore } from "@/components/home/scroll-section";
import { SkillsExplorer } from "@/components/home/skills-explorer";
import { SymbolRain } from "@/components/home/symbol-rain";
import { getPackageSkills } from "@/lib/essential-skills";
import { getHeroStats, getPacks } from "@/lib/home-data";

export default async function Home() {
  const packageSkills = await getPackageSkills();
  const packs = getPacks(packageSkills.quickCount, packageSkills.totalCount);

  return (
    <div className="relative flex min-h-full flex-col items-center bg-background">
      <ScrollSectionRestore />
      <SymbolRain />
      <CursorGlow />
      <div className="relative z-1 flex w-full flex-col items-center">
        <Header />
        <main className="flex w-full flex-col items-center">
          <Hero stats={getHeroStats(packageSkills.totalCount)} />
          <HowItWorks />
          <Packs packs={packs} />
          <SkillsExplorer skills={packageSkills.skills} />
          <AgentsStrip />
          <Integration />
          <Cta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
