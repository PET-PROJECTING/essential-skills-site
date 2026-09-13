import { Fragment } from "react";
import { CopyInstall } from "@/components/home/copy-install";
import { HeroTyping } from "@/components/home/hero-typing";
import { Icon } from "@/components/home/icon";
import { hero, icons } from "@/lib/home-data";

type HeroProps = {
  stats: string[];
};

export function Hero({ stats }: HeroProps) {
  return (
    <section className="flex min-h-svh w-full flex-col items-center justify-center gap-10 border-b border-border px-5 py-16 sm:px-10 sm:py-24 lg:px-20 lg:py-[120px]">
      <div className="flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
        <div className="rounded-full border border-accent bg-accent-soft px-3 py-1">
          <span className="font-mono text-[11px] font-semibold text-accent">
            {hero.badge}
          </span>
        </div>
        <HeroTyping title={hero.title} description={hero.description} />
      </div>

      <CopyInstall />

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[13px] text-accent">
        {stats.map((stat, index) => (
          <Fragment key={stat}>
            {index > 0 ? <Icon src={icons.ellipse} size={4} /> : null}
            <span>{stat}</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
