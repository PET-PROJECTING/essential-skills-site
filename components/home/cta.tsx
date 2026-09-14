import { Icon } from "@/components/home/icon";
import { cta, icons, site } from "@/lib/home-data";

export function Cta() {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-surface/90 px-5 py-16 text-center sm:px-10 sm:py-20 lg:px-20 lg:py-24">
      <div className="flex max-w-[520px] flex-col items-center gap-3">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[32px]">
          {cta.title}
        </h2>
        <p className="font-text text-[15px] text-muted">{cta.description}</p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={site.npmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-2 rounded-md border border-accent bg-transparent px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft focus-visible:bg-accent-soft"
        >
          <Icon src={icons.terminal} size={14} currentColor />
          {cta.primary}
        </a>
        <a
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
        >
          <Icon src={icons.githubLight} size={14} currentColor />
          {cta.secondary}
        </a>
      </div>
    </section>
  );
}
