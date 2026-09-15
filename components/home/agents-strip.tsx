import { Icon } from "@/components/home/icon";
import { agentsStrip, icons } from "@/lib/home-data";

/** Repeat enough times so one segment is wider than typical viewports. */
const SEGMENT_REPEAT = 3;

function AgentItem({ name, href, inert }: { name: string; href: string; inert?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Icon src={icons.terminal} size={14} />
      {inert ? (
        <span className="pointer-events-none whitespace-nowrap text-sm font-medium text-foreground">
          {name}
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto whitespace-nowrap text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:text-accent"
        >
          {name}
        </a>
      )}
    </div>
  );
}

function AgentSegment({
  idPrefix,
  inert,
}: {
  idPrefix: string;
  inert?: boolean;
}) {
  const items = Array.from({ length: SEGMENT_REPEAT }, (_, repeatIndex) =>
    agentsStrip.agents.map((agent) => ({
      ...agent,
      key: `${idPrefix}-${repeatIndex}-${agent.name}`,
    })),
  ).flat();

  return (
    <div
      className="agents-marquee-segment flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20"
      aria-hidden={inert || undefined}
    >
      {items.map((agent) => (
        <AgentItem key={agent.key} name={agent.name} href={agent.href} inert={inert} />
      ))}
    </div>
  );
}

export function AgentsStrip() {
  return (
    <section className="flex w-full max-w-full flex-col items-center gap-6 overflow-x-clip border-b border-border py-10 sm:py-12">
      <p className="px-5 font-mono text-xs uppercase text-muted-dim sm:px-10 lg:px-20">
        {agentsStrip.label}
      </p>

      <div className="agents-marquee relative h-6 w-full max-w-full overflow-hidden">
        <div className="agents-marquee-track pointer-events-none">
          <AgentSegment idPrefix="a" />
          <AgentSegment idPrefix="b" inert />
        </div>
      </div>

      <ul className="agents-marquee-static hidden w-full list-none flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 sm:px-10 lg:px-20">
        {agentsStrip.agents.map((agent) => (
          <li key={agent.name}>
            <AgentItem name={agent.name} href={agent.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
